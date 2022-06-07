import React, { useContext, useEffect } from "react";
import AuthContext from "../Context/auth-context";

const Orders = () => {
  const authCtx = useContext(AuthContext);
  const getOrders = () => {
    fetch("http://localhost:3000/user/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authCtx.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="text-left">
      <h3 className="text-xl">My Orders</h3>
      <div>
        <p>Order Confirmed</p>
        <p>Date</p>
        <p>Order: #id</p>
        <p>Price</p>
        <p>Address</p>
        <div>Product</div>
      </div>
    </div>
  );
};

export default Orders;
