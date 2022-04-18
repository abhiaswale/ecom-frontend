import React from "react";
import bg from "../Assets/ecom.jpg";
import Navigation from "../Navigation/Navigation";

const Landing = () => {
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
        <button>Shop Now</button>
      </section>
      <section>
        <h1>FEATURED CATEGORIES</h1>
        <div>
          <div className="grid grid-cols-4">
            <div>Category 1</div>
            <div>Category 2</div>
            <div>Category 3</div>
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
