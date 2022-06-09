import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Rating from "@mui/material/Rating";

const SingleProduct = () => {
  const [product, setProduct] = useState();
  const productId = useParams();

  const getProduct = () => {
    fetch(`http://localhost:3000/get-product/${productId.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setProduct(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Navigation />
      {product && (
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 w-3/5 my-6">
            <div className="p-4">
              <img className="h-54 w-54" src={product.productImage}></img>
            </div>
            <div className="text-left">
              <p className="text-xl font-semibold ">
                {product.productDescription}
              </p>
              <p>{product.productBrand}</p>
              <div>
                <Rating
                  name="read-only"
                  value={product.productRating}
                  readOnly
                />
                {product.productReviews}
              </div>

              <p>{product.productPrice}</p>
              <div>
                <p>Fast delivery available</p>
                <p>Price displayed is inclusive of GST</p>
                <p>Currently in stock</p>
              </div>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
      {product && <p>{product.productName}</p>}
    </>
  );
};

export default SingleProduct;
