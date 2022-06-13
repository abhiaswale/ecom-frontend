import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";
import Navigation from "../Navigation/Navigation";
import AddressSelector from "./AddressSelector";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartContext from "../Context/cart-context";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [addresses, setAddresses] = useState([]);
  const [selection, setSelection] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const authCtx = useContext(AuthContext);

  const getCart = () => {
    // setProducts(cartCtx.cart);
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
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  useEffect(() => {
    if (products) {
      let tp = 0;
      products.forEach((p) => {
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
        console.log(data.data);
        setAddresses(data.data);
        if (data.data.length > 0) {
          setSelectedAddress(data.data[0]);
        }
      });
  };
  useEffect(() => {
    getCart();
    getAddresses();
  }, []);

  const addtoCartHandler = (id) => {
    fetch(`http://localhost:3000/user/add-to-cart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authCtx.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data.items);
      })
      .then(() => {
        cartCtx.updateCartQuan();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromCartHandler = (id) => {
    fetch(`http://localhost:3000/user/delete-from-cart/${id}`, {
      method: "POST",
      headers: {
        Authorization: authCtx.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data.items);
      })
      .then(() => {
        cartCtx.updateCartQuan();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  return (
    <div className="">
      <Navigation />
      <h3 className="my-6 p-4 text-xl font-semibold">MY CART</h3>
      <div className=" text-left flex justify-center items-center">
        <div className="grid grid-cols-2 divide-x divide-indigo-500 gap-4 w-4/6">
          <div>
            <div className="flex justify-between my-4 p-4 rounded-xl border-[1px] border-black">
              {selectedAddress && (
                <section>
                  <p>
                    Deliver to :{" "}
                    <strong>
                      {selectedAddress.Name},{selectedAddress.Pincode}
                    </strong>
                  </p>
                  <p className="font-semibold text-sm"></p>
                  <p className="text-xs">
                    {selectedAddress.AddressLine1},
                    {selectedAddress.AddressLine2},{selectedAddress.City},
                    {selectedAddress.State}
                  </p>
                </section>
              )}
              {!selectedAddress && <p>Address not Selected</p>}
              <div className="flex justify-center items-center ">
                <button
                  className="text-sm rounded-lg mx-2 px-4 py-2 border-[1px] border-[#3053c8] text-[#3053c8] transition-all hover:bg-[#3053c8] hover:text-white"
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
            <div className="my-4 p-2 rounded-xl border-[1px] border-black">
              {products &&
                products.map((p) => (
                  <div
                    className="flex justify-center items-center p-2"
                    key={p.productId._id}
                  >
                    <div className=" w-72 h-60">
                      <img
                        className="bg-cover"
                        src={p.productId.productImage}
                      ></img>
                    </div>
                    <div>
                      <p className="font-semibold">
                        {p.productId.productDescription}
                      </p>
                      <p>&#8377;{p.productId.productPrice}</p>
                      <div className="flex justify-start items-center my-2">
                        <button
                          className="border-[1px] border-black rounded-lg p-[4px] mr-2"
                          onClick={() => {
                            addtoCartHandler(p.productId._id);
                            // cartCtx.addToCart(p.productId._id);
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
                            removeFromCartHandler(p.productId._id);
                            // cartCtx.removeFromCart(p.productId._id);
                          }}
                        >
                          {p.quantity <= 1 ? <DeleteIcon /> : <RemoveIcon />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              {products.length <= 0 && <p>No Products in cart!</p>}
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
                // disabled={true}
                className=" text-white  w-full p-2 rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]"
                onClick={() => {
                  postOrder();
                }}
              >
                Place Order
              </button>
              {!selectedAddress && <p>Please select a address to checkout</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
