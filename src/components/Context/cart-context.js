import React, { useState, useEffect } from "react";
const CartContext = React.createContext({
  cartQuantity: 0,
  updateCartQuan: () => {},
});

export const CartContextProvider = (props) => {
  const [quan, setQuan] = useState(null);

  const updateCart = () => {
    fetch("http://localhost:3000/cart")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log("Updated Cart");
        let count = 0;
        data.data.forEach((element) => {
          count++;
        });
        console.log(count);
        setQuan(count);
      });
  };

  useEffect(() => {
    updateCart();
  }, []);

  const contextValue = {
    cartQuantity: quan,
    updateCartQuan: updateCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
