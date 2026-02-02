import Footer from "./Footer";
//import Image1 from "../Images/image1.png";

import Image4 from "../Images/image4.png";
import Video2 from "../Images/video2.mp4";

const Abouts = () => {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(to bottom right, #21377068, #020e20ff)",
          minHeight: "100vh",
          padding: "3rem 1rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "2rem",
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          {/* Left Side: Text Box */}
          <div
            className="text-box"
            style={{
              flex: "7",
              background: "#fff",
              borderRadius: "18px",
              padding: "2.5rem",
              boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            <h1 style={{ color: "#1f3c88", marginBottom: "1rem" }}>
              About iNotebook
            </h1>
            <p
              style={{
                lineHeight: "1.8",
                fontSize: "1.15rem",
                color: "#333",
              }}
            >
              Welcome to <strong>iNotebook</strong> — your personal, secure, and
              easy-to-use online notebook. Whether you're jotting down ideas,
              saving important information, or organizing your daily tasks,
              iNotebook keeps your notes safe and accessible — anytime,
              anywhere.
            </p>

            <div style={{ marginTop: "1.8rem" }}>
              <h2 style={{ color: "#34495e", marginBottom: "0.7rem" }}>
                Why choose iNotebook?
              </h2>
              <ul
                style={{
                  paddingLeft: "1.5rem",
                  color: "#444",
                  lineHeight: "1.6",
                  fontSize: "1.05rem",
                }}
              >
                <li>Access your notes anytime, anywhere</li>
                <li>Secure cloud storage</li>
                <li>Simple and user-friendly interface</li>
                <li>Organize notes with ease</li>
              </ul>
            </div>

            <p
              style={{
                marginTop: "1.8rem",
                fontSize: "1.05rem",
                color: "#555",
              }}
            >
              Think of it as your digital notebook that travels with you — from
              your phone to your laptop — so your thoughts are always within
              reach. Simple to use, secure to trust, and always ready when you
              are.
            </p>
          </div>

          {/* Right Side: Video Container */}
          <div
            className="video-container"
            style={{
              flex: "3",
              borderRadius: "18px",
              overflow: "hidden",
              minHeight: "100%",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            <video
              src={Video2}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "18px",
              }}
            />
          </div>
        </div>

        {/* Full Width Banner Image before Footer */}
        <div
          style={{
            width: "100%",
            margin: "1rem 0",
          }}
        >
          <img
            src={Image4}
            alt="About Banner"
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              objectFit: "cover",
            }}
          />
        </div>

        

        {/* Animations */}
        <style>
          {`
          .image-container:hover {
            transform: scale(1.03);
            box-shadow: 0 12px 28px rgba(0,0,0,0.35);
          }
          .text-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
        `}
        </style>
        
      </div>
      <Footer />
    </>
  );
};

export default Abouts;
