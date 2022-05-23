import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./Context/auth-context";
import CartContext from "./Context/cart-context";

const Prod = () => {
  const [products, setProducts] = useState("");
  const [cart, setCart] = useState("");
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const fetchProd = async () => {
    const response = await fetch("http://localhost:3000/get-products");
    const data = await response.json();
    console.log(data);
    setProducts(data.data);
  };

  useEffect(() => {
    fetchProd();
  }, []);

  const getCartHandler = () => {
    fetch(`http://localhost:3000/cart`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCart(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addtoCartHandler = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/add-to-cart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authCtx.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.items);
        setCart(data.data.items);
      })
      .then(() => {
        cartCtx.updateCartQuan();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromCartHandler = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/delete-from-cart/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data.items);
      })
      .then(() => {
        cartCtx.updateCartQuan();
      })
      .then(() => {
        cartCtx.updateCartQuan();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postOrder = () => {
    fetch(`http://localhost:3000/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCartHandler();
  }, []);

  return (
    <div>
      <button onClick={getCartHandler}>get Cart</button>
      {cart &&
        cart.map((p) => (
          <section key={p._id}>
            <h6>{p.productId.productName}</h6>
            <div>
              <button
                onClick={() => {
                  addtoCartHandler(p.productId._id);
                }}
              >
                +
              </button>
              <p>{p.quantity}</p>
              <button
                onClick={() => {
                  removeFromCartHandler(p.productId._id);
                }}
              >
                -
              </button>
            </div>
          </section>
        ))}
      <button
        onClick={() => {
          postOrder();
        }}
      >
        POST ORDER
      </button>
      {products &&
        products.map((prod) => (
          <li key={prod._id}>
            <h4>{prod.productName}</h4>
            <button
              onClick={() => {
                addtoCartHandler(prod._id);
              }}
            >
              Add to cart
            </button>
          </li>
        ))}
    </div>
  );
};

export default Prod;
