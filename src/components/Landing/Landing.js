import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../Assets/w.jpg";
import Navigation from "../Navigation/Navigation";

const Landing = () => {
  const navigate = useNavigate();
  const filterHandler = (id) => {
    navigate("/shop", { state: id });
  };
  return (
    <div>
      <Navigation />
      <section
        style={{ backgroundImage: `url(${bg})` }}
        className="bg-cover w-full h-[76vh]"
      >
        <h1>ECom.</h1>
        <p>Lets Design Together</p>
        <h1>CLEARANCE SALE</h1>
        <h4>Upto 70% Off on Various products</h4>
        <button>
          <Link to="/shop">Shop Now</Link>
        </button>
      </section>
      <section>
        <h1>FEATURED CATEGORIES</h1>
        <div>
          <div className="grid grid-cols-4">
            <div>
              <button
                onClick={() => {
                  filterHandler("Mobile Phone");
                }}
              >
                Mobile Phone
              </button>
            </div>
            <div>
              {" "}
              <button
                onClick={() => {
                  filterHandler("Laptop");
                }}
              >
                Laptop
              </button>
            </div>
            <div>
              {" "}
              <button
                onClick={() => {
                  filterHandler("Camera");
                }}
              >
                Camera
              </button>
            </div>
            <div>Category 4</div>
          </div>
        </div>
      </section>
      <section>
        <h1>FEATURED BRANDS</h1>
        <div>
          <div className="grid grid-cols-4">
            <div>Brand 1</div>
            <div>Brand 2</div>
            <div>Brand 3</div>
            <div>Brand 4</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
