import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";
import Navigation from "../Navigation/Navigation";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const authCtx = useContext(AuthContext);
  const getCart = () => {
    fetch("http://localhost:3000/user/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authCtx.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setProducts(data.data);
      });
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="">
      <Navigation />
      <h3 className="my-6 p-4 text-xl font-semibold">MY CART</h3>
      <div className=" text-left flex justify-center items-center">
        <div className="grid grid-cols-2 w-3/4">
          <div>
            <div className=" my-4 p-2 rounded-xl border-2 border-black">
              <p>Deliver to :</p>
              <p>Address 1</p>
            </div>
            <div className="my-4 p-2 rounded-xl border-2 border-black">
              {products.map((p) => (
                <div
                  className="flex justify-center items-center p-2"
                  key={p.productId._id}
                >
                  <div>
                    <img
                      className="w-96 h-auto"
                      src={p.productId.productImage}
                    ></img>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {p.productId.productDescription}
                    </p>
                    <p>&#8377;{p.productId.productPrice}</p>
                    <p>{p.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>2</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
