import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import toastify
import { toast } from "react-toastify";

// import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    let regBtn = document.querySelector(".registerButton");
    regBtn.style.display = "none";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.log("sending request to backend");
      let res = await axios.post(
        "/api/v1/auth/register",
        {
          username,
          email,
          password,
          confirmPassword,
        }
      );
      // console.log("Reg user", res);
      if (res.status == 201) {
        toast.success("Registered Successfully");
        navigate("/login");
      }
      // res.data && window.location.replace("/login");
      setLoading(false);
      // res.data && window.location.replace("/login");
    } catch (err) {
      if (err) {
        let regBtn = document.querySelector(".registerButton");
        regBtn.style.display = "block";
      }
      if (err.message == "Request failed with status code 400") {
        toast.error("Please fill all the fields", {
          type: "error",
        });
      } else if (err.message == "Request failed with status code 409") {
        toast.error("Registration Failed , User already exists", {
          type: "error",
        });
      } else if (err.message == "Request failed with status code 500") {
        toast.error("Registration Failed , Internal Server Error", {
          type: "error",
        });
      } else if (err.message == "Request failed with status code 401") {
        toast.error("Registration Failed , Password does not match", {
          type: "error",
        });
      }
      // console.log(err);
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={(e) => handleSubmit(e)}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Your Username"
          className="registerInput"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          className="registerInput"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          className="registerInput"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          className="registerInput"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button
          className="registerButton"
          type="submit"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
      {/* {error && (
        <span className="registerError">Username or Email already exists</span>
      )} */}
      <span className="registerMessage">Already Registered ? Log In</span>
      <Link to="/login">
        <button className="registerSigninButton">Login</button>
      </Link>
    </div>
  );
};

export default Register;
