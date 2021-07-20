import React from "react";
import ReactDom from "react-dom";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

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
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      item: [
        {
          name: "",
          unit: "",
          quantity: "",
          value: "",
        },
      ],
    },
  });

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

  const deleteButton = (_id) => {
    return <button>Delete</button>;
  };

  const markAsDelivered = (isDelivered) => {
    if (!isDelivered) {
      return (
        <button
          onClick={() => {
            //TODO
          }}
        >
          Mark As Delivered
        </button>
      );
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
                <section key={index} className="items">
                  <div className="important">
                    <h3>{status[index].name}</h3>
                  </div>
                  <h3>
                    {"Quantity: "}
                    {status[index].quantity}
                    {" Unit: "}
                    {status[index].unit}
                    {" Value: "}
                    {status[index].value}
                    {" Received: "}
                    {status[index].received}
                  </h3>
                </section>
              );
            })}
            <h1>Total: {totalValue}</h1>
          </Status>

          {updateButton(isDelivered)}
          {deleteButton(_id)}
          {markAsDelivered(isDelivered)}

          <UpdateStatus trigger={buttonPopup} setTrigger={setButtonPopup}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onSubmit(inputNumber);
                setButtonPopup(false);
              }}
            >
              <h1> Update Status of Order {_id} </h1>
              <h2> Enter Number of Recieved Items: </h2>

              {status.map((object, index) => {
                const handleChange = (event) => {
                  inputNumber[index] = event.target.value;
                };

                return (
                  <section key={index} className="items">
                    <div className="important">
                      <h3>{status[index].name}</h3>
                    </div>
                    <h3>
                      {"Quantity: "}
                      {status[index].quantity}
                      {" Unit: "}
                      {status[index].unit}
                      {" Value: "}
                      {status[index].value}
                    </h3>
                    <div className="input">
                      <input
                        className="inputField"
                        type="number"
                        id="inputQuantityDelivered"
                        name={inputNumber[index]}
                        onChange={handleChange}
                        placeholder="Received"
                      />
                      <h3>
                        of {status[index].quantity} (
                        {status[index].received || status[index].sent} completed
                        previously)
                      </h3>
                    </div>
                  </section>
                  // <section key={index}>
                  //   <h3>
                  //     {status[index].name}{" "}
                  //     <input
                  //       type="number"
                  //       id="inputQuantityDelivered"
                  //       name={inputNumber[index]}
                  //       onChange={handleChange}
                  //     />
                  //     of {status[index].quantity} (
                  //     {status[index].received || status[index].sent} completed
                  //     previously)
                  //   </h3>
                  // </section>
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
