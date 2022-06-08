import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";

const Orders = () => {
  const [orders, setOrders] = useState([]);
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
        setOrders(data.data);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="text-left m-6">
      <h3 className="font-semibold my-2">MY ORDERS</h3>

      {orders.map((o) => (
        <div className="p-4 shadow-2xl rounded-lg text-sm">
          <div className="my-2 text-sm">
            <p className="text-base font-semibold">Order Confirmed</p>
            <p>{o.createdAt}</p>
          </div>
          <p className="my-2">Order #{o._id}</p>
          <p className="my-2">Total: &#8377;{o.totalAmount}</p>
          <p>
            Deliver To: {o.address.Name} {o.address.AddressLine1},
            {o.address.AddressLine2},{o.address.City},{o.address.State}
          </p>
          <div className="my-2">
            {o.products.map((p) => (
              <div
                onClick={() => {}}
                className="my-2 flex justify-start items-center border-[1px] border-black rounded-lg"
              >
                <div className="p-2 m-2">
                  <img className="w-32 h-auto" src={p.product.productImage} />
                </div>
                <div>
                  <p>{p.product.productName}</p>
                  <span>Quantity:{p.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
