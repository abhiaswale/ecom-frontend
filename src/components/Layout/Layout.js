import React from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Layout = (props) => {
  return (
    <>
      <Navigation />
      <div className="">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
