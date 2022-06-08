import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

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
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 w-3/5 my-6">
          <div>
            <img src={product.productImage}></img>
          </div>
          <div>
            <p>{product.productDescription}</p>
            <p>{product.productBrand}</p>
            <p>Reviews: {product.productReviews}</p>
            <p>Rating: {product.productRating}</p>
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
      {product && <p>{product.productName}</p>}
    </>
  );
};

export default SingleProduct;
