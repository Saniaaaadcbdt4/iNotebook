import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Image from "../Images/image1.png"; // 👈 ek new image import karo

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "default" }); // reset
    props.showAlert("Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (

    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%", // ✅ full width
        //testing
        paddingTop: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0",
        padding: "0",
        overflow: "hidden",
      }}
      > 
    
      
      {/* Background Image with Overlay */}
      <div
        style={{
         position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          //padding:0,
          //margin:0,
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.45)", // ✅ darken bg
          zIndex: -2,
        }}>
      </div>

      {/* Overlay tint for extra readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          //background: "rgba(141, 17, 17, 0.3)8, 0.3)",
          background: "rgba(0,0,0,0.3)", // ✅ subtle overlay
          zIndex: -1,
        }}
      ></div>

      {/* Prominent Card */}
      <div
    className="card shadow-lg border-0 rounded-4 p-5" 
    style={{
      position: "relative",    // card upar rahe
      width: "100%",
      maxWidth: "600px",
      color: "#fff",
      boxShadow: "0px 10px 35px rgba(0,0,0,0.7)",
      border: "1px solid rgba(255,255,255,0.25)",
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(14px)",
    }}>
  
        <h2 className="animated-heading mb-4">Add a New Note</h2>

        <form autoComplete="off">
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Title
            </label>
            <input
              type="text"
              className="form-control rounded-3 shadow-sm"
              style={inputStyle}
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              required
              placeholder="Enter title..."
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Description
            </label>
            <textarea
              className="form-control rounded-3 shadow-sm"
              style={inputStyle}
              id="description"
              name="description"
              rows="3"
              value={note.description}
              onChange={onChange}
              required
              placeholder="Write description..."
            ></textarea>
          </div>

          {/* Tag */}
          <div className="mb-3">
            <label htmlFor="tag" className="form-label fw-semibold">
              Tag
            </label>
            <input
              type="text"
              className="form-control rounded-3 shadow-sm"
              style={inputStyle}
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              placeholder="E.g. work, personal"
            />
          </div>

          {/* Button */}
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn w-100 fw-bold rounded-3 shadow-sm"
            style={{
              background: "linear-gradient(90deg, #d4af37, #e0c068)", // gold gradient
              border: "none",
              color: "#000",
              marginTop: "20px",
              fontSize: "1.1rem",
              boxShadow: "0px 6px 20px rgba(212,175,55,0.5)", // glow effect
            }}
            onClick={handleClick}
          >
            ➕ Add Note
          </button>
        </form>
      </div>

      {/* Extra Styles */}
      <style>
        {`
          .animated-heading {
            background: linear-gradient(90deg, #f8f9fa, #e5e7eb, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: 'Poppins', sans-serif;
            letter-spacing: 1px;
            font-weight: 700;
            position: relative;
            display: inline-block;
          }

          .animated-heading::after {
            content: "";
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #d4af37, #e0c068);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s ease;
          }
          .animated-heading:hover::after {
            transform: scaleX(1);
          }

          .form-control:focus {
            border-color: #d4af37 !important;
            box-shadow: 0 0 8px rgba(212, 175, 55, 0.6) !important;
          }
        `}
      </style>
    </div>
  );
};

const inputStyle = {
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.3)",
  color: "#fff",
};

export default AddNote;
