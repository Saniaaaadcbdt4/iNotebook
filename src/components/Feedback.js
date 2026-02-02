import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Feedback = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { addFeedback } = context;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.feedback) {
    showAlert("Please fill in all fields ❌", "danger");
    return;
  }

  if (rating < 1 || rating > 5) {
    showAlert("Please select a rating ⭐", "danger");
    return;
  }

  // Convert rating to number just in case
  addFeedback(formData.name, formData.email, formData.feedback, Number(rating));

  showAlert("Thank you for your valuable feedback!", "info");

  // reset form
  setFormData({ name: "", email: "", feedback: "" });
  setRating(0);
};


  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #21377068, #020e20ff)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "60px",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* 🔹 Left Side Text + Button */}
        <div style={{ flex: "1", minWidth: "280px", marginTop: "5rem" }}>
          <h1
            style={{
              color: "#f1f5f9",
              marginBottom: "20px",
              fontSize: "2.2rem",
              lineHeight: "1.3",
            }}
          >
            We’d love to hear from you!
          </h1>
          <p
            style={{
              color: "#cbd5e1",
              fontSize: "1.1rem",
              lineHeight: "1.7",
              marginBottom: "25px",
            }}
          >
            Whether you have a question, feedback, or want to collaborate —
            we’re always ready to listen and help you out.
          </p>

          <button
            style={{
              padding: "12px 28px",
              borderRadius: "50px",
              border: "none",
              background: "linear-gradient(90deg, #2563eb, #1e40af)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s ease, background 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #1d4ed8, #1e3a8a)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #2563eb, #1e40af)")
            }
            onClick={() => (window.location.href = "/contact")}
          >
            📩 Contact Us
          </button>
        </div>

        {/* 🔹 Right Side Feedback Form */}
        <div
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "30px",
            borderRadius: "15px",
            maxWidth: "480px",
            width: "100%",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#1e3a8a",
              marginBottom: "10px",
            }}
          >
            Share Your Feedback
          </h2>
          <p
            style={{
              textAlign: "center",
              marginBottom: "12px",
              fontWeight: "500",
              color: "#374151",
            }}
          >
            Rate us out of 5
          </p>

          {/* ⭐ Star Rating */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "30px",
                    color:
                      index <= (hover || rating) ? "#facc15" : "#9ca3af",
                    transition: "color 0.2s ease, transform 0.2s ease",
                  }}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  ★
                </button>
              );
            })}
          </div>

          {/* ✅ Feedback Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
              }}
            />
            <textarea
              placeholder="Write your feedback..."
              value={formData.feedback}
              onChange={(e) =>
                setFormData({ ...formData, feedback: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0",
                borderRadius: "8px",
                border: "1px solid #ccc",
                minHeight: "100px",
                fontSize: "15px",
              }}
            ></textarea>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#1e3a8a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "10px",
                transition: "background 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#2563eb")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#182f7bff")
              }
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
