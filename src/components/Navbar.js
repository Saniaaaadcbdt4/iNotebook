
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  // Splash screen hide after 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token"); // ✅ simple remove token
    navigate("/login");
  };

  if (showSplash) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(135deg, #1e293b, #3b82f6)",
          color: "#e2e8f0",
          fontFamily: "'Montserrat', sans-serif",
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #60a5fa, #93c5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "slideDown 1.2s ease",
          }}
        >
          iNotebook
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            opacity: "0.9",
            animation: "fadeInUp 1s ease",
          }}
        >
          by Sania Ahmed
        </p>
      </div>
    );
  }

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{ background: "linear-gradient(135deg, #2c3e50, #34495e)" }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <NavLink
          className="navbar-brand fw-bold"
          style={{ fontSize: "22px", letterSpacing: "1.5px", color: "#ecf0f1" }}
          to="/"
        >
          📒 iNotebook
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Links */}
          <ul className="navbar-nav ms-3">
            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "600" : "400",
                  color: isActive ? "#1abc9c" : "#ecf0f1",
                })}
                to="/about"
              >
                About
              </NavLink>
            </li>

            {/* Notes Dropdown */}
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle px-3"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "#ecf0f1" }}
              >
                Notes
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/Addyournotehere">
                    ➕ Add Note
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/mynotes">
                    📑 My Notes
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Feedback */}
            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "600" : "400",
                  color: isActive ? "#1abc9c" : "#ecf0f1",
                })}
                to="/feedback"
              >
                💬 Feedback
              </NavLink>
            </li>
          </ul>

          {/* Right Side Links */}
          <div className="ms-auto d-flex align-items-center">
            <NavLink
              className="nav-link px-3"
              style={({ isActive }) => ({
                fontWeight: isActive ? "600" : "400",
                color: isActive ? "#1abc9c" : "#ecf0f1",
              })}
              to="/contact"
            >
              Contact Us
            </NavLink>

            {/* Right buttons */}
            <div className="d-flex" style={{ paddingRight: "20px" }}>
              {!localStorage.getItem("auth-token") ? (
                <>
                  <NavLink
                    className="btn me-2 blink-btn"
                    style={{
                      borderRadius: "50px",
                      backgroundColor: "#1abc9c",
                      color: "white",
                      padding: "6px 18px",
                      fontWeight: "500",
                    }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    className="btn"
                    style={{
                      borderRadius: "50px",
                      backgroundColor: "#3498db",
                      color: "white",
                      padding: "6px 18px",
                      fontWeight: "500",
                    }}
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    style={{
                      borderRadius: "50px",
                      backgroundColor: "#1abc9c",
                      color: "white",
                      padding: "6px 20px",
                      fontWeight: "500",
                    }}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <NavLink className="dropdown-item" to="/profile">
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/settings">
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
