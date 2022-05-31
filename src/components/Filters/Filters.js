import React, { useEffect, useState } from "react";

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
  const [products, setProducts] = useState(props.products);

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

  let content;

  // content = (
  //   <div className="grid grid-cols-4">
  //     {products.map((prod) => (
  //       <div key={prod._id}>
  //         <h1>{prod.productName}</h1>
  //         <span>{prod.productPrice}</span>
  //         <img src={prod.productImage} className="w-60"></img>
  //         <button
  //           onClick={() => {
  //             props.onAdd(prod._id);
  //           }}
  //         >
  //           Add to cart
  //         </button>
  //       </div>
  //     ))}
  //   </div>
  // );
  if (fProd.length > 0) {
    content = (
      <div className="grid grid-cols-4">
        {fProd.map((prod) => (
          <div key={prod._id}>
            <h1>{prod.productName}</h1>
            <span>{prod.productPrice}</span>
            <img src={prod.productImage} className="w-60"></img>
            <button
              onClick={() => {
                props.onAdd(prod._id);
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (fProd.length <= 0) {
    content = (
      <div className="grid grid-cols-4">
        {products.map((prod) => (
          <div key={prod._id}>
            <h1>{prod.productName}</h1>
            <span>{prod.productPrice}</span>
            <img src={prod.productImage} className="w-60"></img>
            <button
              onClick={() => {
                props.onAdd(prod._id);
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    );
  }

  if ((bChecked.length > 0 || checked.length > 0) && fProd.length <= 0) {
    content = <h1>No Products found</h1>;
  }

  //SORTING LOGIC
  const SortHandler = (value) => {
    if (value == -1) {
      const p = props.products.sort((a, b) => {
        return Number(a.productPrice) - Number(b.productPrice);
      });
      console.log(p);
      setProducts(p);
    }
    if (value == 1) {
      const p = props.products.sort((a, b) => {
        return Number(b.productPrice) - Number(a.productPrice);
      });
      console.log(p);
      setProducts(p);
    }
  };

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
          >
            Clear All
          </button>
        </div>
        <div className="border-b-[1px] border-indigo-500"></div>
        <div className="text-left">
          <ul>
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
                />
                Low to High
              </label>
            </li>
          </ul>
          <div className="border-b-[1px] border-indigo-500"></div>
          <ul>
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
          <ul>
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
