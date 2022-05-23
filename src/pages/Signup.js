import React from "react";
import Form from "../components/Form/Form";
import Navigation from "../components/Navigation/Navigation";

const Signup = () => {
  return (
    <div>
      <Navigation />
      <Form>
        <form className="w-full">
          <h1 className="text-2xl font-bold my-4">SIGNUP</h1>
          <div className="my-4">
            <input type="text" placeholder="Email"></input>
          </div>
          <div className="my-4">
            <input type="password" placeholder="Password"></input>
          </div>
          <button type="submit">Login</button>
          <div>New user? Register Now</div>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
