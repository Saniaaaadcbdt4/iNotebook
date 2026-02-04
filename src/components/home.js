
   import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import BookDemo from "./Bookdemo";
import Video from "../Images/video.mp4"; 
import Image1 from "../Images/image3.png"; 
import Image2 from "../Images/image2.png";   
  
 // 👈 simple static pic

const Home = () => {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(to bottom right, #21377068, #020e20ff)",
          height: "100%",
          padding: "50px 20px",
          color: "#f8fafc",
          fontFamily: "Segoe UI, sans-serif",
          textAlign: "center",
        }}
      >
        {/* Welcome Section */}
        <h1 style={{ fontSize: "2.5rem", marginBottom: "15px" }}>
          Welcome to <span style={{ color: "#facc15" }}>iNotebook</span>
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "40px",
            color: "#d1d5db",
          }}
        >
          Capture your thoughts, organize your ideas, and access your notes
          anytime, anywhere.
        </p>

        {/* Features */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ color: "#38bdf8" }}>Secure Notes</h3>
            <p style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>
              Keep your notes safe and private with advanced security.
            </p>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ color: "#38bdf8" }}>Access Anywhere</h3>
            <p style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>
              Your notes are always with you, on any device, anytime.
            </p>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ color: "#38bdf8" }}>Easy Organize</h3>
            <p style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>
              Tags and categories help you stay organized effortlessly.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <NavLink to="/notes">
          <button
            style={{
              background: "#1f2937",
              color: "#facc15",
              border: "none",
              padding: "12px 25px",
              fontSize: "16px",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#374151")}
            onMouseOut={(e) => (e.target.style.background = "#1f2937")}
          >
            Start Taking Notes →
          </button>
        </NavLink>
      </div>

      {/* Carousel Section */}
   {/* Carousel Section */}
<div
  id="carouselExampleIndicators"
  className="carousel slide"
  data-bs-ride="carousel"
  data-bs-interval="3000"
  style={{
    width: "98%",   // full screen width
    margin: "10px", // center horizontally with bottom margin
    
  }}
>
  <div
    className="carousel-inner"
    style={{
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.4)",
      aspectRatio: "16/9",
      overflow: "hidden",
    }}
  >
    {/* Video Slide */}
    <div className="carousel-item active">
      <video
        src={Video}
        className="d-block w-100"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "80%",
          objectFit: "cover",
        }}
      />
    </div>

    {/* Image Slide */}
    <div className="carousel-item">
      <img
        src={Image2}
        className="d-block w-100"
        alt="Static Slide"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
    <div className="carousel-item">
      <img
        src={Image1}
        className="d-block w-100"
        alt="Static Slide"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  </div>

  {/* Carousel Controls */}
  {/*<button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon"></span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon"></span>
  </button>*/}
  
</div>


      {/* Demo and Footer */}
      <BookDemo />
      <Footer />
    </>
  );
};

export default Home;
