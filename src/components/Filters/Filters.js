import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CartContext from "../Context/cart-context";
const Filters = (props) => {
  const categoryFilters = [
    { id: 1, name: "Mobile", type: "category" },
    { id: 2, name: "Laptop", type: "category" },
    { id: 3, name: "Headphone", type: "category" },
    { id: 4, name: "Watch", type: "category" },
  ];
  const brandFilters = [
    { id: "b1", name: "Apple", type: "brand" },
    { id: "b2", name: "Samsung", type: "brand" },
    { id: "b3", name: "Asus", type: "brand" },
    { id: "b4", name: "Sony", type: "brand" },
    { id: "b5", name: "Jbl", type: "brand" },
    { id: "b6", name: "Realme", type: "brand" },
    { id: "b7", name: "Dell", type: "brand" },
  ];

  const [filtering, setFiltering] = useState(false);
  const [checked, setChecked] = useState([]);
  const [bChecked, setBChecked] = useState([]);
  const [fProd, setFProd] = useState([]);
  const [products, setProducts] = useState(props.wishlistProds);
  const wishlist = props.wishlist;

  const cartCtx = useContext(CartContext);
  // console.log(products);
  // const Temp = () => {
  //   const prod = [...products];
  //   prod.forEach((p) => {
  //     wishlist.forEach((e) => {
  //       let updatedItem;
  //       if (e.productId === p._id) {
  //         const index = prod.findIndex((i) => e.productId === i._id);
  //         console.log(index);
  //         updatedItem = { ...p, wishlist: true };
  //         prod[index] = updatedItem;
  //       } else if (p._id !== e.productId) {
  //         const index = products.findIndex((i) => p._id === i._id);
  //         updatedItem = { ...p, wishlist: false };
  //         prod[index] = updatedItem;
  //       }
  //     });
  //   });
  //   console.log(prod);
  //   setProducts(prod);
  // };
  // useEffect(() => {
  //   if (wishlist.length > 0) {
  //     Temp();
  //   }
  // }, [wishlist]);

  const navigate = useNavigate();

  // console.log(wishlist);
  // console.log(products);
  let filteredProducts = [];

  //Filter Logic
  const filterHandler = (id, type) => {
    setFiltering(true);
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const brandfilterHandler = (id, type) => {
    setFiltering(true);
    const currentIndex = bChecked.indexOf(id);
    const newChecked = [...bChecked];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setBChecked(newChecked);
  };

  if (filtering) {
    console.log(checked, bChecked);
    if (checked.length > 0 || bChecked.length > 0) {
      filteredProducts = props.products.filter((product) => {
        if (
          checked.includes(product.productCategory) ||
          bChecked.includes(product.productBrand)
        ) {
          return product;
        }
        return null;
      });
      setFProd(filteredProducts);
    }
    if (checked.length > 0 && bChecked.length > 0) {
      filteredProducts = props.products.filter((p) => {
        if (
          checked.includes(p.productCategory) &&
          bChecked.includes(p.productBrand)
        ) {
          console.log(p);
          return p;
        }
        return null;
      });
      setFProd(filteredProducts);
    }
    setFProd(filteredProducts);
    setFiltering(false);
  }

  useEffect(() => {
    if (props.fId) {
      if (props.fId.type === "category") {
        filterHandler(props.fId.id);
      } else {
        brandfilterHandler(props.fId.id);
      }
    }
  }, [props.fId]);

  useEffect(() => {
    if (fProd.length > 0) {
      setProducts(fProd);
    } else if (fProd.length <= 0) {
      setProducts(props.products);
    }
  }, [fProd]);

  //SORTING LOGIC
  const SortHandler = (value) => {
    let p;
    if (value == -1) {
      p = products.sort((a, b) => {
        return Number(a.productPrice) - Number(b.productPrice);
      });
    }
    if (value == 1) {
      p = products.sort((a, b) => {
        return Number(b.productPrice) - Number(a.productPrice);
      });
    }
    console.log(p);
    setProducts([...p]);
  };

  let content;
  content = (
    <div className="grid grid-cols-4 gap-4">
      {products.map((prod) => (
        <div key={prod._id}>
          <div
            className="flex justify-center items-center"
            onClick={() => {
              navigate(`/shop/${prod._id}`);
            }}
          >
            <img src={prod.productImage} className="w-52 h-52 bg-cover"></img>
          </div>
          <p>{prod.productBrand}</p>
          <h1>{prod.productName}</h1>
          <span>{prod.productPrice}</span>
          <button
            onClick={() => {
              // props.onAdd(prod._id);
              cartCtx.addToCart(prod._id);
            }}
          >
            add to cart
          </button>
          <button>{prod.wishlist === true ? "y" : "n"}</button>
        </div>
      ))}
    </div>
  );

  if ((bChecked.length > 0 || checked.length > 0) && fProd.length <= 0) {
    content = <h1>No Products found</h1>;
  }

  return (
    <div className="flex justify-start items-start">
      <div className="ml-4 w-1/5 my-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold ">FILTERS</h3>
          <button
            onClick={() => {
              setBChecked([]);
              setChecked([]);
              setFiltering(true);
            }}
            className="underline leading-4"
          >
            Clear All
          </button>
        </div>
        <div className="border-b-[1px] border-indigo-500"></div>
        <div className="text-left">
          <ul className="my-2">
            <li className="text-[1.1rem] font-bold p-[2px] my-2">SORT</li>
            <li>
              <label>
                <input
                  type="radio"
                  id="htl"
                  value="1"
                  name="sorting"
                  onChange={() => {
                    SortHandler(1);
                  }}
                  className="mr-2"
                />
                High to low
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  id="lth"
                  value="-1"
                  name="sorting"
                  onChange={() => {
                    SortHandler(-1);
                  }}
                  className="mr-2"
                />
                Low to High
              </label>
            </li>
          </ul>
          <div className="border-b-[1px] border-indigo-500"></div>
          <ul className="my-2">
            <li className="text-[1.1rem] font-bold p-[2px] my-2">CATEGORY</li>
            {categoryFilters.map((value, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  onChange={() => {
                    filterHandler(value.name, value.type);
                  }}
                  checked={checked.indexOf(value.name) === -1 ? false : true}
                />
                <label>{value.name}</label>
              </li>
            ))}
          </ul>
          <div className="border-b-[1px] border-indigo-500"></div>
          <ul className="my-2">
            <li className="text-[1.1rem] font-bold p-[2px] my-2">BRAND</li>
            {brandFilters.map((value, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  onChange={() => {
                    brandfilterHandler(value.name, value.type);
                  }}
                  checked={bChecked.indexOf(value.name) === -1 ? false : true}
                />
                <label>{value.name}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default Filters;
