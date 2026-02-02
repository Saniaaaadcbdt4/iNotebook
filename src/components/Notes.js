
import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  // ===================== LOGIN PROTECTION =====================
  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      navigate("/login");
      props.showAlert("Please login first", "danger");
      return;
    }

    getNotes();
    // eslint-disable-next-line
  }, []);

  // ===================== OPEN EDIT MODAL =====================
  const updateNote = (currentNote) => {
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });

    ref.current.click();
  };

  // ===================== SAVE EDITED NOTE =====================
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.eid, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note updated successfully!", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // ===================== SEARCH FILTER =====================
  const filteredNotes = notes.filter((n) =>
    [n.title, n.description, n.tag].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ===================== SORT PINNED ON TOP =====================
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #21377068, #020e20ff)",
        minHeight: "100vh",
        width: "100%",
        color: "#f8fafc",
        paddingTop: "20px",
      }}
    >
      {/* Add Note */}
      {props.showOnly !== "mynotes" && <AddNote showAlert={props.showAlert} />}

      {/* Hidden Modal Button */}
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      {/* ===================== EDIT MODAL ===================== */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              backgroundColor: "#1e293b",
              color: "#f8fafc",
              borderRadius: "12px",
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title" style={{ color: "#38bdf8" }}>
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close btn"
                data-bs-dismiss="modal"
                style={{ filter: "invert(1)" }}
              ></button>
            </div>

            <div className="modal-body">
              <form autoComplete="off">
                <input
                  className="form-control mb-3"
                  name="etitle"
                  value={note.etitle}
                  onChange={onChange}
                  required
                />
                <textarea
                  className="form-control mb-3"
                  name="edescription"
                  rows={4}
                  value={note.edescription}
                  onChange={onChange}
                  required
                />
                <input
                  className="form-control"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                />
              </form>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 3
                }
                onClick={handleClick}
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== NOTES LIST ===================== */}
      <div className="row my-4" style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Your Notes Dashboard
        </h2>

        {notes.length > 0 && (
          <div className="mb-4 text-center">
            <input
              type="text"
              placeholder="🔍 Search your notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "60%",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#0f172a",
                color: "#f8fafc",
                border: "1px solid #334155",
              }}
            />
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          {sortedNotes.length === 0 ? (
            <p style={{ textAlign: "center", color: "lightgray" }}>
              No notes found 🔍
            </p>
          ) : (
            sortedNotes.map((data) => (
              <Noteitem
                key={data._id}
                note={data}
                updateNote={updateNote}
                showAlert={props.showAlert}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
