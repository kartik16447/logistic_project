import React from "react";
import ReactDom from "react-dom";
import { useState } from "react";

// import "./index.css";
// import orders from './orders';
import Vendors from "./Vendors";
import UpdateStatus from "./UpdateStatus";
import Status from "./Status";

const Order = ({
  _id,
  receiverWarehouse,
  senderWarehouse,
  vendor,
  consignee,
  items,
  totalValue,
  status,
  nature,
  isDelivered,
}) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);

  const whichButton = (isDelivered) => {
    if (isDelivered) {
      return <button onClick={() => setButtonPopup2(true)}>Receipt</button>;
    } else {
      return (
        <button onClick={() => setButtonPopup2(true)}>Check Status</button>
      );
    }
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    // fetch("http://localhost:8000/order", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const deleteButton = (isDelivered) => {
    if (!isDelivered) {
      return <button>Delete</button>;
    } else {
      return <button>Delete</button>;
    }
  };

  const updateButton = (isDelivered) => {
    if (!isDelivered) {
      return (
        <button onClick={() => setButtonPopup(true)}>Update Status</button>
      );
    } else {
      return null;
    }
  };

  const info = () => {
    if (nature == "inward") {
      return (
        <section>
          <h2>Vendor : {vendor.name} </h2>
          <h2> Warehouse : {receiverWarehouse.name} </h2>
        </section>
      );
    }

    if (nature == "outward") {
      return (
        <section>
          {" "}
          <h2>Warehouse : {senderWarehouse.name} </h2>
          <h2> Consignee : {consignee.name} </h2>
        </section>
      );
    }
  };

  var inputNumber = [];

  // const handleChange = (event) => {

  //     console.log(event.target.value)

  //     inputNumber[index] = (event.target.value)
  // }

  // const handleSubmit = (event) => {
  //     event.preventDefault()
  //     console.log(inputNumber)
  // }

  //SAMPLE DATA -

  // let orders = [

  // {
  //   _id: 39,
  //   warehouseName: 'MUM',
  //   vendor: 'DEL',
  //   dispatchDate: '20.06.2021' ,
  //   deliveryDate: '04.07.2021' ,
  //   totalValue: 4500 ,
  //   item : [{itemName:'Water',itemQuantityDelivered:0,itemQuantity:3,itemUnit:10,itemValue:4000},{itemName:'Rice',itemQuantity:'5',itemUnit:'6',itemValue:'500'}],
  //   isDelivered: false,
  // },
  console.log();
  return (
    <div className="order">
      <ul>
        <li>
          <h1>Order UID NO. : {_id}</h1>
        </li>
        {info()}
        <li>
          {whichButton(isDelivered)}
          <Status trigger={buttonPopup2} setTrigger={setButtonPopup2}>
            <h1>Order: {_id} </h1>
            {info()}

            <h1>Items - </h1>
            {status.map((object, index) => {
              return (
                <li key={index}>
                  <h3>
                    {" "}
                    {status[index].name} -{" "}
                    {status[index].recieved || status[index].sent}/
                    {status[index].quantity}
                  </h3>
                </li>
              );
            })}
            <h1>Total: {totalValue}</h1>
          </Status>

          {deleteButton(isDelivered)}

          {updateButton(isDelivered)}
          <UpdateStatus trigger={buttonPopup} setTrigger={setButtonPopup}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onSubmit(inputNumber);
                setButtonPopup(false);
              }}
            >
              <h3> Update Status of Order {_id} </h3>
              <p> Enter Number of Recieved Items: </p>

              {status.map((object, index) => {
                const handleChange = (event) => {
                  inputNumber[index] = event.target.value;
                };

                return (
                  <li key={index}>
                    <h1>
                      {" "}
                      {status[index].name}{" "}
                      <input
                        type="number"
                        id="inputQuantityDelivered"
                        name={inputNumber[index]}
                        onChange={handleChange}
                      />
                      of {status[index].quantity} (
                      {status[index].received || status[index].sent} completed
                      previously)
                    </h1>
                  </li>
                );
              })}

              <button type="submit">Submit</button>
            </form>
          </UpdateStatus>
        </li>
      </ul>
    </div>
  );
};

export default Order;
