import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Image1 from "../Images/image1.png";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();
  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "failed");
      return;
    }

    try {
      const response = await fetch(`${host}/api/auth/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // ✅ Save token in localStorage
        localStorage.setItem("auth-token", json.authtoken);
        props.showAlert("Account created successfully!", "success");
        navigate("/"); // redirect to home
      } else {
        props.showAlert(json.error || "Signup failed", "failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      props.showAlert("Something went wrong", "failed");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      padding: "5rem", minHeight: "100vh",
      display: "flex", justifyContent: "center", alignItems: "center",
      position: "relative", overflow: "hidden", color: "white"
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${Image1})`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.4)", zIndex: -2
      }}></div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(10,25,47,0.85), rgba(32,58,67,0.85), rgba(44,83,100,0.9))",
        zIndex: -1
      }}></div>

      <style>{`input::placeholder { color: #ddd; opacity: 0.8; }`}</style>

      <form onSubmit={handleSubmit} autoComplete="on" style={{
        background: "rgba(255, 255, 255, 0.08)", backdropFilter: "blur(10px)",
        padding: "2.5rem", borderRadius: "20px", boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        width: "380px", textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "1.5rem", fontWeight: "600" }}>Create Account</h2>

        <input type="text" name="name" placeholder="Username" value={credentials.name} onChange={onChange} autoComplete="username" required style={inputStyle} />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange}autoComplete="new-password" required style={inputStyle} />
        <input type="password" name="cpassword" placeholder="Confirm Password" value={credentials.cpassword} onChange={onChange} required style={inputStyle} />

        <button type="submit" style={buttonStyle}>Sign Up</button>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#ddd" }}>
          Already have an account?{" "}
          <NavLink to="/login" style={{ color: "#00c6ff", textDecoration: "none" }}>Login</NavLink>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%", padding: "0.9rem", margin: "0.8rem 0",
  border: "none", borderRadius: "10px",
  background: "rgba(255, 255, 255, 0.2)",
  color: "white", outline: "none", transition: "all 0.2s ease"
};

const buttonStyle = {
  marginTop: "1rem", width: "100%", padding: "0.9rem",
  border: "none", borderRadius: "12px",
  background: "linear-gradient(135deg, #00c6ff, #0072ff)",
  color: "white", fontWeight: "600", fontSize: "1rem",
  cursor: "pointer", transition: "all 0.3s ease"
};

export default Signup;
