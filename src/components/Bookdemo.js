import React from "react";

import { NavLink } from "react-router-dom";



const BookDemo = () => {
  return (
    <div
      style={{
        background: "#d2def8ff",
        color: "#1f2937",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <p style={{ margin: 0, fontSize: "15px" }}>
        📒 Want to see how iNotebook works? Book a demo now!
      </p>
      <NavLink
  to="/about"
  style={{
    display: "inline-block",
    background: "#1f2937",
    color: "#facc15",
    border: "none",
    padding: "8px 16px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "0.3s ease",
  }}
  onMouseOver={(e) => (e.target.style.background = "#374151")}
  onMouseOut={(e) => (e.target.style.background = "#1f2937")}
>
  Book Demo
</NavLink>
    </div>
  );
};

export default BookDemo;
