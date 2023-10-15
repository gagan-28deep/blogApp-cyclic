import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./resetPassword.css";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleReset = async (e) => {
    // console.log("Request to backend from reset page");
    try {
      e.preventDefault();
      let res = await axios.patch(
        "/api/v1/auth/resetPassword",
        {
          email,
          otp,
          password,
          confirmPassword,
        }
      );
      if (res.status == 201) {
        toast.success(
          "Password reset successfully , Please Login with new password"
        );
        navigate("/login");
      }
    } catch (err) {
      if (err.message == "Request failed with status code 404") {
        toast.error("Wrong Otp Entered");
      } else if (err.message == "Request failed with status code 401") {
        toast.error("Please fill all the fields");
      } else if (err.message == "Request failed with status code 400") {
        toast.error("Your otp is expired");
      } else if (err.message == "Request failed with status code 500") {
        toast.error("Internal Server Error");
      } else if (err.message == "Request failed with status code 504") {
        toast.error("Bad Gateway");
      }
      // console.log(err.message);
    }
  };
  return (
    <div className="resetPass">
      <span className="resetTitle">Reset Password</span>
      <form className="resetForm">
        <label>Email</label>
        <input
          className="resetInput"
          type="text"
          placeholder="Please Enter Email To Reset Password"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>OTP</label>
        <input
          className="resetInput"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <label>NEW PASSWORD</label>
        <input
          className="resetInput"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setResetPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          className="resetInput"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="resetButton" onClick={handleReset}>
          RESET PASSWORD
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
