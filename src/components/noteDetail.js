import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NoteDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { note } = location.state || {};

  if (!note) return <p>No note found</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(180deg, #5a769a, #1c2b49)", // ✅ same ombre
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        padding: "30px",
      }}
    >
      <div
        className="card shadow-lg p-5 rounded-4"
        style={{
          background: "rgba(0,0,0,0.7)",
          color: "white",
          maxWidth: "700px",
          width: "100%",
          lineHeight: "1.8",
        }}
      >
        <h2>{note.title}</h2>
        <p>{note.description}</p>
        <small>Tag: {note.tag}</small>
        <br />
        <button
          onClick={() => navigate(-1)}
          className="btn btn-light mt-3"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default NoteDetail;
