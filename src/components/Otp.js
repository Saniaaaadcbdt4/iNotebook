import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Otp(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const host = "http://localhost:5000";

  const [otp, setOtp] = useState("");

  // 🔹 Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const json = await response.json();

    if (!json.success) {
      props.showAlert(json.error || "Invalid OTP", "danger");
      return;
    }

    localStorage.setItem("token", json.authtoken);
    props.showAlert("Logged in successfully!", "success");
    navigate("/");
  };

  // 🔹 RESEND OTP
  const handleResendOtp = async () => {
    const response = await fetch(`${host}/api/auth/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const json = await response.json();

    if (json.success) {
      props.showAlert("OTP resent successfully!", "success");
    } else {
      props.showAlert("Failed to resend OTP", "danger");
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Enter OTP</h2>
      <p>
        A 4-digit OTP has been sent to: <b>{email}</b>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>4-digit OTP</label>
          <input
            type="text"
            maxLength="4"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100">Verify OTP</button>
      </form>

      <button
        onClick={handleResendOtp}
        className="btn btn-link mt-3"
        style={{ textDecoration: "underline" }}
      >
        Resend OTP
      </button>
    </div>
  );
}

export default Otp;
