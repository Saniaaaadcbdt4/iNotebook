import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState({});
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  // ✅ NEW: Login state
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("auth-token"));
  const updateLoginState = (status) => setIsLoggedIn(status);

  // ============================ TOKEN HELPER ============================
  const readToken = () => localStorage.getItem("auth-token");

  // ============================ 2FA ============================
  const setTwoFALastVerified = () => {
    localStorage.setItem("twoFA_lastVerified", Date.now().toString());
  };

  const shouldAskForTwoFA = () => {
    const last = localStorage.getItem("twoFA_lastVerified");
    if (!last) return true;

    const hoursPassed = (Date.now() - Number(last)) / (1000 * 60 * 60);
    return hoursPassed >= 72;
  };

  // ============================ NOTES ============================
  const getNotes = async () => {
    const token = readToken();
    if (!token) return;

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        headers: { "Content-Type": "application/json", "auth-token": token },
      });
      const json = await response.json();
      setNotes(Array.isArray(json) ? json : json.notes || []);
    } catch (err) {
      console.error("Fetch notes error:", err);
    }
  };
  


  const addNote = async (title, description, tag) => {
  const token = readToken();
  if (!token) return;

  await fetch(`${host}/api/notes/addnotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify({ title, description, tag }),
  });

  await getNotes(); // ✅ single source of truth
};


  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "auth-token": readToken() },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    if (json.success && json.note) {
      setNotes((prev) => prev.map((n) => (n._id === id ? json.note : n)));
    }
  };

  const deleteNote = async (id) => {
    const token = readToken();
    if (!token) return;

    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "auth-token": token },
    });

    const json = await response.json();
    if (json.success) setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const togglePin = async (id, currentPinned) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "auth-token": readToken() },
      body: JSON.stringify({ pinned: !currentPinned }),
    });

    const json = await response.json();
    if (json.success && json.note) setNotes((prev) => prev.map((n) => (n._id === id ? json.note : n)));
  };

  // ============================ FEEDBACK ============================
  const getFeedbacks = async () => {
    const response = await fetch(`${host}/api/feedback/fetchallfeedbacks`);
    const json = await response.json();
    if (Array.isArray(json)) setFeedbacks(json);
  };

  const addFeedback = async (name, email, feedback, rating) => {
    const response = await fetch(`${host}/api/feedback/addfeedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, feedback, rating: Number(rating) }),
    });
    const json = await response.json();
    if (json?._id) setFeedbacks((prev) => [...prev, json]);
  };

  // ============================ PROFILE ============================
  const getProfile = async () => {
    const token = readToken();
    if (!token) return;

    const response = await fetch(`${host}/api/auth/profile`, {
      headers: { "Content-Type": "application/json", "auth-token": token },
    });

    const json = await response.json();
    setProfile(json.user || {});
    setTwoFAEnabled(json.user?.twoFA || false);
  };

  const updateProfile = async (updatedData) => {
    const response = await fetch(`${host}/api/auth/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "auth-token": readToken() },
      body: JSON.stringify(updatedData),
    });

    const json = await response.json();
    setProfile(json.user || {});
  };

  // ============================ PASSWORD ============================
  const changePassword = async (currentPassword, newPassword) => {
    const response = await fetch(`${host}/api/auth/change-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "auth-token": readToken() },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    return await response.json();
  };

  const enableTwoFA = async (pin) => {
    const token = readToken();
    if (!token) return { success: false };

    const response = await fetch(`${host}/api/auth/twofactor`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "auth-token": token },
      body: JSON.stringify({ enable: true, pin: String(pin) }),
    });

    return await response.json();
  };

  const verify2FA = async (pin) => {
    if (!twoFAEnabled) {
      console.log("⛔ 2FA not enabled — skipping verification");
      return { success: true };
    }
    if (!shouldAskForTwoFA()) {
      console.log("✅ 2FA recently verified");
      return { success: true };
    }

    const response = await fetch(`${host}/api/auth/verify-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": readToken() },
      body: JSON.stringify({ pin: String(pin) }),
    });

    const data = await response.json();
    if (data.success) setTwoFALastVerified();
    return data;
  };

  // ============================ ACCOUNT ============================
  const deactivateAccount = async () => {
    const response = await fetch(`${host}/api/auth/deactivate-account`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "auth-token": readToken() },
    });
    return await response.json();
  };

  const deleteAccount = async () => {
    const response = await fetch(`${host}/api/auth/delete-account`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "auth-token": readToken() },
    });
    return await response.json();
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        editNote,
        deleteNote,
        getNotes,
        togglePin,
        feedbacks,
        addFeedback,
        getFeedbacks,
        searchTerm,
        setSearchTerm,
        profile,
        getProfile,
        updateProfile,
        changePassword,
        verify2FA,
        deleteAccount,
        deactivateAccount,
        setTwoFALastVerified,
        shouldAskForTwoFA,
        twoFAEnabled,
        enableTwoFA,
        setTwoFAEnabled,
        isLoggedIn,       // ✅ NEW
        updateLoginState, // ✅ NEW
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
