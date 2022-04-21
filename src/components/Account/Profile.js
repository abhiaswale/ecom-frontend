import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";

const Profile = () => {
  const [userData, setUserData] = useState();
  const [cart, setCart] = useState("");

  const authCtx = useContext(AuthContext);

  const getCartHandler = () => {
    fetch(`http://localhost:3000/cart`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCart(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (cart) {
    console.log(cart);
  }

  useEffect(() => {
    fetch("http://localhost:3000/user/details", {
      method: "GET",
      headers: { Authorization: authCtx.token },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.user);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {userData && (
        <section>
          <p>hjkj</p>
          <p>{userData.firstName}</p>
          <button onClick={getCartHandler}>Get cart</button>
        </section>
      )}
    </div>
  );
};

export default Profile;
