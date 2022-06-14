import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartContext from "../Context/cart-context";
import LoadingSpinner from "../util/LoadingSpinner";
import SnackBar from "../util/SnackBar";
import Layout from "../Layout/Layout";
// import { Snackbar } from "@mui/material";
// import { Snackbar } from "@mui/material";
const SingleProduct = () => {
  const [product, setProduct] = useState();
  const [isProductInCart, setIsProductInCart] = useState();
  const [Loading, setLoading] = useState(true);
  const productId = useParams();
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

  const getProduct = () => {
    setLoading(true);
    fetch(`http://localhost:3000/get-product/${productId.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setProduct(data.data);
      })
      .then(() => {
        cartCtx.cart.forEach((p) => {
          p.productId._id === productId.id
            ? setIsProductInCart(true)
            : setIsProductInCart(false);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(cartCtx.cart);

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Layout>
      {Loading && <LoadingSpinner />}
      <SnackBar />
      {product && (
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:w-4/5 my-6 shadow-xl rounded-lg">
            <div className="p-4">
              <img
                className=" lg:h-[35rem] lg:w-[35rem]"
                src={product.productImage}
              ></img>
            </div>
            <div className="p-4 mt-10 text-left">
              <p className="text-xl font-semibold pt-4">
                {product.productDescription}
              </p>
              <p className="py-2">{product.productBrand}</p>
              <div className="flex ">
                <Rating
                  name="read-only"
                  value={product.productRating}
                  readOnly
                />
                <span className="">({product.productReviews} Reviews)</span>
              </div>

              <p className="flex flex-col text-xl font-semibold py-1">
                &#8377; {product.productPrice}
                <span className="text-xs">Inclusive of all Taxes</span>
              </p>
              <div className="my-2 ">
                <div className="border-b-[0.5px] border-gray-300"></div>
              </div>
              <div className="my-2">
                <div className="py-[1px]">
                  <LocalShippingIcon style={{ fontSize: "20px" }} />

                  <span className="text-sm mx-2">Fast delivery available</span>
                </div>
                <div className="py-[1px]">
                  <CheckBoxIcon style={{ fontSize: "20px" }} />
                  <span className="text-sm mx-2">
                    Price displayed is inclusive of GST
                  </span>
                </div>
                <div className="py-[1px]">
                  <InventoryIcon style={{ fontSize: "20px" }} />
                  <span className="text-sm mx-2">Currently in stock</span>
                </div>
              </div>
              <button
                onClick={() => {
                  isProductInCart
                    ? navigate("/cart")
                    : cartCtx.addToCart(product._id);
                }}
                className="text-white my-4 p-2 px-5 rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]"
              >
                <ShoppingCartIcon />{" "}
                {isProductInCart ? "Go to cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SingleProduct;
