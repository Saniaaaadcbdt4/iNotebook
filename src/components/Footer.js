import React from "react";
import { NavLink } from "react-router-dom";

const Footer = ({ fullscreen = false }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#1f2937",
        color: "#f9fafb",
        padding: "40px 20px 20px",

        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "30px",
          maxWidth: "1200px",
          margin: "auto",
          padding: "80px",
        }}
      >
        {/* About */}
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3 style={{ marginBottom: "15px", color: "#facc15" }}>
            📒iNotebook
          </h3>
          <p style={{ lineHeight: 1.6, fontSize: "14px" }}>
            Your personal digital notebook for capturing thoughts, organizing
            notes, and staying productive. Designed to keep your ideas safe and
            accessible anywhere.
          </p>
        </div>

        {/* Quick Links */}

        <div style={{ flex: 1, minWidth: 250 }}>
          <h4 style={{ marginBottom: "15px", color: "#facc15" }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {/*home*/}
             
        <li style={{ margin: "8px 0" }}>
          <NavLink
            to="/"
            style={{ color: "#f9fafb", textDecoration: "none" }}
          >
            Home
          </NavLink>
        </li>
            {/*My notes*/}
            <li style={{ margin: "8px 0", listStyle: "none" }}>
              <NavLink
                to="/mynotes"
                style={{ color: "#f9fafb", textDecoration: "none" }}
              >
                My Notes
              </NavLink>
            </li>

            {/*Add notes*/}
            <li style={{ margin: "8px 0" }}>
              <NavLink
                to="/addnote"
                style={{ color: "#f9fafb", textDecoration: "none" }}
              >
                Add Note
              </NavLink>
            </li>
            {/*about*/}
            <li style={{ margin: "8px 0" }}>
              <NavLink
                to="/about"
                style={{ color: "#f9fafb", textDecoration: "none" }}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div style={{ flex: 1, minWidth: 250 }}>
          <h4 style={{ marginBottom: "15px", color: "#facc15" }}>Contact</h4>
          <p style={{ fontSize: "14px", margin: "6px 0" }}>
            Email: support@inotebook.com
          </p>
          <p style={{ fontSize: "14px", margin: "6px 0" }}>
            Phone: +92 300 1234567
          </p>
          <p style={{ fontSize: "14px", margin: "6px 0" }}>
            Location: Karachi, Pakistan
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          fontSize: "13px",
          borderTop: "1px solid #374151",
          paddingTop: "15px",
        }}
      >
        <p style={{ margin: 0 }}>
          © {year} iNotebook. All rights reserved. | Built for
          productivity.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
