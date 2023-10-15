import React, { useEffect, useState, useContext } from "react";
import "./login.css";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { user, dispatch, isFetching } = useContext(Context);
  const [loading, setLoading] = useState(false);

  // Handle Login
  const handleLogin = async () => {
    let logButton = document.querySelector(".loginButton");
    logButton.style.display = "none";
  };
  const handleSubmit = async (e) => {
    // let flag = true;
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    console.log("Login page sending request to backend");
    try {
      setLoading(true);
      let res = await axios.post(
        "/api/v1/auth/login",
        {
          username,
          password,
        }
      );
      // console.log("Login user", res);
      if (res.status == 200) {
        toast.success("Login Successful");
      }
      // console.log("Login user", res);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setLoading(false);
      // console.log("Login user", res.data);
    } catch (err) {
      if (err) {
        let logButton = document.querySelector(".loginButton");
        logButton.style.display = "block";
      }
      if (err.message == "Request failed with status code 404") {
        toast.error("Login Failed , User not found");
        // flag = false;
      } else if (err.message == "Request failed with status code 400") {
        toast.error("Login Failed , Please fill all the fields", {
          type: "error",
        });
      } else if (err.message == "Request failed with status code 401") {
        toast.error("Login Failed , Password does not match", {
          type: "error",
        });
      } else if (err.message == "Request failed with status code 500") {
        toast.error("Login Failed , Internal Server Error");
      }
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      // console.log(err);
    }
    // console.log(user);
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="loginButton" type="submit" onClick={handleLogin}>
          Login
        </button>
        {/* <Link to="/forgotPassword">
          <button className="forgotPasswordBtn" type="submit">
            Forgot Password
          </button>
        </Link> */}
      </form>
      {isFetching && <h1>Verifying Credentials</h1>}
      {/* {error && (
        <p className="error">
          Invalid email or password , Please try with correct credentials
        </p>
      )} */}
      <Link to="/forgotPassword">
        <button className="forgotPasswordBtn" type="submit">
          Forgot Password
        </button>
      </Link>
      <span className="loginError">Want to register?</span>
      <Link to="/register">
        <button className="registerLoginButton">Register</button>
      </Link>
    </div>
  );
};

export default Login;
