import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import CartContext from "../Context/cart-context";

const SnackBar = () => {
  const cartCtx = useContext(CartContext);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={cartCtx.open}
      autoHideDuration={1000}
      message={cartCtx.snack}
    ></Snackbar>
  );
};

export default SnackBar;
