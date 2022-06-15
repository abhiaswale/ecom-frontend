import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";
import AddressSelector from "./AddressSelector";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartContext from "../Context/cart-context";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../Layout/Layout";
import SnackBar from "../util/SnackBar";
import displayRazorpay from "../util/PaymentGateway";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [addresses, setAddresses] = useState([]);
  const [selection, setSelection] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const authCtx = useContext(AuthContext);

  const getCart = () => {
    setProducts(cartCtx.cart);
    console.log(cartCtx.cart);
  };

  useEffect(() => {
    if (cartCtx.cart) {
      let tp = 0;
      cartCtx.cart.forEach((p) => {
        tp = tp + p.productId.productPrice * p.quantity;
      });
      setTotalPrice(tp);
    }
  }, [getCart]);

  const getAddresses = () => {
    fetch("http://localhost:3000/get-addresses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authCtx.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data.data);
        if (data.data.length > 0) {
          setSelectedAddress(addresses[0]);
        }
      });
  };
  useEffect(() => {
    getCart();
    getAddresses();
  }, []);

  const postOrder = () => {
    if (products.length <= 0) {
      alert("CArt is Empty");
      return;
    }
    fetch(`http://localhost:3000/user/order`, {
      method: "POST",
      headers: {
        Authorization: authCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aId: selectedAddress,
        totalPrice: totalPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  return (
    <Layout>
      <SnackBar />
      <div>
        <h3 className="p-4 text-xl font-semibold">MY CART</h3>
        {cartCtx.cart.length > 0 && (
          <div className="lg:text-base text-sm text-left flex justify-center items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-gray-300 gap-4 w-11/12 lg:w-4/6">
              <div>
                <div className="flex justify-between my-4 p-4 rounded-xl border-[1px] border-gray-300">
                  {selectedAddress && (
                    <section>
                      <p className="">
                        Deliver to :{" "}
                        <strong>
                          {selectedAddress.Name},{selectedAddress.Pincode}
                        </strong>
                      </p>
                      <p className="font-semibold text-sm"></p>
                      <p className="lg:text-xs ">
                        {selectedAddress.AddressLine1},{selectedAddress.City},
                        {selectedAddress.State}
                      </p>
                    </section>
                  )}
                  {!selectedAddress && <p>Address not Selected</p>}
                  <div className="flex justify-center items-center ">
                    <button
                      className="text-sm rounded-lg mx-2 px-4 py-2 border-[1px] border-gray-300 text-black transition-all hover:bg-[#3053c8] hover:text-white"
                      onClick={() => {
                        setSelection(true);
                      }}
                    >
                      Change
                    </button>
                  </div>
                  {selection && (
                    <AddressSelector
                      setAddresses={setAddresses}
                      addresses={addresses}
                      addressSelector={setSelectedAddress}
                      selection={setSelection}
                    />
                  )}
                </div>
                <div className="my-4 p-2 rounded-xl border-[1px] border-gray-300">
                  {cartCtx.cart &&
                    cartCtx.cart.map((p) => (
                      <div
                        // className="flex justify-center items-center p-2"
                        className="grid grid-cols-30/70 "
                        key={p.productId._id}
                      >
                        <div className="w-36 h-36 align-middle">
                          <img
                            className="bg-cover lg:w-full w-3/4"
                            src={p.productId.productImage}
                          ></img>
                        </div>
                        <div className="w-full">
                          <p className="font-semibold">
                            {p.productId.productDescription}
                          </p>
                          <p>&#8377;{p.productId.productPrice}</p>
                          <div className="flex justify-start items-center my-2">
                            <button
                              className="border-[1px] border-black rounded-lg p-[4px] mr-2"
                              onClick={() => {
                                cartCtx.addToCart(p.productId._id);
                              }}
                            >
                              <AddIcon />
                            </button>
                            <p className="border-[1px] border-black rounded-lg p-[4px] px-4 mx-2">
                              {p.quantity}
                            </p>
                            <button
                              className="border-[1px] border-black rounded-lg p-[4px] mx-2"
                              onClick={() => {
                                cartCtx.removeFromCart(p.productId._id);
                              }}
                            >
                              {p.quantity <= 1 ? (
                                <DeleteIcon />
                              ) : (
                                <RemoveIcon />
                              )}
                            </button>
                          </div>
                        </div>
                        {/* <div className="border-b-2 border-black w-full"></div> */}
                      </div>
                    ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">PRICE DETAILS</h3>
                <section className="my-2 grid grid-cols-2">
                  <p>Total MRP :</p>
                  <span>{totalPrice}</span>
                </section>
                <section className="my-2 grid grid-cols-2">
                  <p>Convinience Fee</p>
                  <span>
                    <del>&#8377;99</del> FREE
                  </span>
                </section>
                <div className="my-4">
                  <button
                    disabled={selectedAddress ? false : true}
                    className={`${
                      selectedAddress ? "bg-black" : ""
                    }text-white w-full p-2 rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]`}
                    onClick={() => {
                      postOrder();
                    }}
                  >
                    Place Order
                  </button>
                  {!selectedAddress && (
                    <p className="text-center text-red-500 font-semibold">
                      Please select a address to checkout
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {cartCtx.cart.length <= 0 && (
          <p className="lg:text-xl font-semibold my-10">No Products in cart!</p>
        )}
      </div>
      <button
        onClick={() => {
          displayRazorpay();
        }}
      >
        Display Razorpay
      </button>
    </Layout>
  );
};

export default Cart;
