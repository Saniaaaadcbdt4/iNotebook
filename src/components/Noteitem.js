import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom"; // ✅ import navigation

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, togglePin } = context;
  const { note, updateNote } = props;
  const navigate = useNavigate(); // ✅ hook

  const handleOpenDetail = () => {
    navigate(`/note/${note._id}`, { state: { note } }); // ✅ pass note to detail page
  };

  return (
    <div
      className="col-md-3 mb-3"
      style={{
        width: "280px",
        background: "linear-gradient(145deg, #2c2c2c, #1a1a1a)",
        color: "#fff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.6)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        wordBreak: "break-word",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        cursor: "pointer", // ✅ cursor pointer for click effect
      }}
      onClick={handleOpenDetail} // ✅ card click → detail page
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.7)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.6)";
      }}
    >
      {/* Title */}
      <h5
        style={{
          fontWeight: "bold",
          color: note.pinned ? "#ffd700" : "#00bfff",
          textAlign: "center",
          margin: "0",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {note.title}
      </h5>

      {/* Description */}
      <p
        style={{
          color: "#ddd",
          textAlign: "center",
          margin: "0",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {note.description}
      </p>

      {/* Action Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto", // ✅ buttons stay bottom aligned
        }}
        onClick={(e) => e.stopPropagation()} // ✅ stop bubbling so button works separately
      >
        {/* Pin Button */}
        <button
          onClick={() => togglePin(note._id, note.pinned)}
          style={{
            background: note.pinned ? "#ffd700" : "#444",
            color: note.pinned ? "#000" : "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "6px 14px",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <i className="fa-solid fa-thumbtack"></i>
          {note.pinned ? "Unpin" : "Pin"}
        </button>

        {/* Edit + Delete */}
        <div style={{ display: "flex", gap: "16px" }}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{
              cursor: "pointer",
              color: "#3498db",
              transition: "transform 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.2)";
              e.target.style.color = "#2980b9";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.color = "#3498db";
            }}
            onClick={() => updateNote(note)}
          ></i>

          <i
            className="fa-solid fa-trash"
            style={{
              cursor: "pointer",
              color: "#e74c3c",
              transition: "transform 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.2)";
              e.target.style.color = "#c0392b";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.color = "#e74c3c";
            }}
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted", "success");
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
