import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";
import AddressSelector from "./AddressSelector";
import CartContext from "../Context/cart-context";
import Layout from "../Layout/Layout";
import SnackBar from "../util/SnackBar";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const [selectedAddress, setSelectedAddress] = useState();
  const [addresses, setAddresses] = useState([]);
  const [products, setProducts] = useState("");
  const [selection, setSelection] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const authCtx = useContext(AuthContext);
  const [paymentId, setPaymentId] = useState("");

  async function displayRazorpay(address) {
    const data = await fetch("http://localhost:3000/payment/razorpay", {
      method: "POST",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => res.json());

    const userDetails = await fetch("http://localhost:3000/user/details", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((t) => t.json());

    const options = {
      key: "rzp_test_9ynKRozO1YO0Gq",
      currency: data.currency,
      amount: data.amount,
      description: "Wallet Transaction",
      logo: "https://ibb.co/4PbHWqt",
      order_id: data.id,
      prefill: {
        name: address.Name,
        email: userDetails.user.email,
        contact: address.Mobile,
      },
      handler: async function (response) {
        alert("Payment ID : " + response.razorpay_payment_id);
        alert("Order ID : " + response.razorpay_order_id);
        setPaymentId(response.razorpay_payment_id);
      },
    };

    //display window
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

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
          setSelectedAddress(data.data[0]);
        }
      });
  };
  useEffect(() => {
    // getCart();
    getAddresses();
  }, []);

  useEffect(() => {
    postOrder();
  }, [paymentId]);

  const postOrder = () => {
    console.log(paymentId);
    if (paymentId) {
      fetch(`http://localhost:3000/user/order`, {
        method: "POST",
        headers: {
          Authorization: authCtx.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aId: selectedAddress,
          totalPrice: totalPrice,
          paymentId: paymentId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/order", { state: data.id });
          setPaymentId("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                      <CartItem p={p} key={p.productId._id} />
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
                      // postOrder(selectedAddress);
                      displayRazorpay(selectedAddress);
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
    </Layout>
  );
};

export default Cart;
