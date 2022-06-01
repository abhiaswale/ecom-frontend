import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  return <>{product.productName}</>;
};

export default SingleProduct;
