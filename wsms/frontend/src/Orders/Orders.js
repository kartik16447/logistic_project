import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from "react";

import Order from "./Order";
import Vendors from "./Vendors";
import UpdateStatus from "./UpdateStatus";

export default function Orders() {
  // const [orders, setOrders] = useState([]);
  // const [allVendors, setAllVendors] = useState([]);
  var allVendors;
  const [orderItems, setOrderItems] = useState([]);
  const [vendors, setVendor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/order", {
      //   mode: 'no-cors',
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // setOrders(data);
        // setAllVendors(orders.map((order) => order.vendor));
        setOrderItems(data);
        allVendors = data.map((order) => order.vendor);
        setVendor(allVendors);
        console.log(data);
      })
      .then(() => {
        if (orderItems != []) setLoading(false);
        console.log(orderItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // if (loading == true) {
  //   return <p>Loading...</p>;
  // }
  if (orderItems == []) {
    return <p>Loading...</p>;
  }
  console.log(orderItems);

  const filterOrders = (vendor) => {
    if (vendor === "all") {
      setOrderItems(orderItems);
      return;
    }
    const newOrders = orderItems.filter((order) => order.vendor === vendor);
    setOrderItems(newOrders);
  };

  const ongoingOrders = orderItems.filter(function (order) {
    let ret = order.isDelivered == false;
    if (ret == null) {
      return [];
    } else {
      return ret;
    }
  });

  const completedOrders = orderItems.filter(function (order) {
    let ret = order.isDelivered == true;
    if (order == null) {
      return [];
    } else {
      return ret;
    }
  });

  return (
    <section className="OrdersPage">
      <h1>ONGOING ORDERS -</h1>
      {ongoingOrders.map((order) => {
        return <Order key={order.id} {...order} />;
      })}
      )<h1>COMPLETED ORDERS -</h1>
      {completedOrders.map((order) => {
        return <Order key={order.id} {...order}></Order>;
      })}
    </section>
  );
}
// ReactDom.render(<Orderlist />, document.getElementById("root"));
