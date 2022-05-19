import React, { useState, useEffect } from "react";
const CartContext = React.createContext({
  cartQuantity: 0,
});

export const CartContextProvider = (props) => {
  const [quan, setQuan] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        let count = 0;
        data.data.forEach((element) => {
          count++;
        });
        console.log(count);
        setQuan(count);
      });
  }, []);
  const contextValue = {
    cartQuantity: quan,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
