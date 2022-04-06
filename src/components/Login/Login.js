import React, { useContext, useState } from "react";
import AuthContext from "../Context/auth-context";
import Form from "../Form/Form";
import Navigation from "../Navigation/Navigation";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async (e) => {
    console.log(email, password);
    e.preventDefault();
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    authCtx.login(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    console.log(data);
    console.log("Login handler");
  };

  return (
    <div>
      <Navigation />
      <Form>
        <form className="w-full" onSubmit={loginHandler}>
          <h1 className="text-2xl font-bold my-4">LOGIN</h1>
          <div className="my-4">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="my-4">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <button type="submit">Login</button>
          <div>Login with test credentials</div>
          <div>New user? Register Now</div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
