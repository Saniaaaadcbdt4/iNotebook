import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = (props) => {
  const host = "http://localhost:5000";

  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/login`, {
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
      localStorage.setItem("auth-token", json.authtoken);
      props.showAlert("Logged in successfully!", "success");
      navigate("/");
    } else {
      props.showAlert(json.error || "Invalid username or password", "failed");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #21377068, #020e20ff)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
         autoComplete="on"
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "400px",
          color: "#f9fafb",
        }}
      >
        
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#facc15",
          }}
        >
          Login
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            Username
          </label>
          <input
            type="text"
            name="name"
            value={credentials.name}
            autoComplete="username"
            onChange={onChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            autoComplete="current-password"
            onChange={onChange}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Login
        </button>
        <p
  style={{
    textAlign: "center",
    marginTop: "10px",
    fontSize: "13px",
  }}
>
  <NavLink
    to="/contact"
    style={{
      color: "#ef4444",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "14px",
    }}
  >
    Forgot password?
  </NavLink>
</p>

        <p
          style={{
            textAlign: "center",
            marginTop: "5px",
            fontSize: "14px",
          }}
        >
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            style={{
              color: "#38bdf8",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign up
          </NavLink>

        </p>
      {/* <p
  style={{
    textAlign: "center",
    marginTop: "10px",
    fontSize: "13px",
  }}
>
  <NavLink
    to="/contact"
    style={{
      color: "#ef4444",
      textDecoration: "none",
      fontWeight: "500",
    }}
  >
    Forgot password?
  </NavLink>
</p>*/}


      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #374151",
  background: "#111827",
  color: "#f9fafb",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "6px",
  background: "#facc15",
  color: "#1f2937",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s ease",
};

export default Login;
