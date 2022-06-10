import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../components/Context/auth-context";
import Form from "../components/Form/Form";
import Layout from "../components/Layout/Layout";
import Navigation from "../components/Navigation/Navigation";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const autoLogout = (miliseconds) => {
    setTimeout(() => {
      authCtx.logout();
      navigate("/login");
    }, miliseconds);
  };
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
    localStorage.setItem("userName", data.userName);
    const remainingMiliseconds = 60 * 60 * 1000;
    const expiryDate = new Date().getTime() + remainingMiliseconds;
    localStorage.setItem("expiryDate", expiryDate);
    autoLogout(remainingMiliseconds);
    console.log(data);
    navigate("/");
    console.log("Login handler");
  };

  return (
    <Layout>
      <Form>
        <form className="w-full " onSubmit={loginHandler}>
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
          <div>
            New user? <Link to="/signup">Signup</Link>{" "}
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default Login;
