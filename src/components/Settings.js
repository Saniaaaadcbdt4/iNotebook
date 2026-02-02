import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Settings = ({ showAlert }) => {
  const navigate = useNavigate();
  const {
    enableTwoFA,
    changePassword,
    verify2FA,
    deleteAccount,
    //deactivateAccount,
    getProfile,
    profile,
    setTwoFALastVerified,
    shouldAskForTwoFA,
  } = useContext(noteContext);

  const [credentials, setCredentials] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twofactor, setTwoFA] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAPin, setTwoFAPin] = useState("");

  const [showVerify2FAModal, setShowVerify2FAModal] = useState(false);
  const [verifyPin, setVerifyPin] = useState("");

  // ================= FETCH PROFILE =================
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  // ================= HANDLE 2FA CHECK =================
  useEffect(() => {
    if (profile?.twoFA) {
      setTwoFA(true);

      if (shouldAskForTwoFA()) {
        setShowVerify2FAModal(true);
      }
    }
  }, [profile, shouldAskForTwoFA]);

  // ================= PASSWORD =================
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (credentials.newPassword !== credentials.confirmPassword) {
      showAlert("Passwords do not match ❌", "danger");
      return;
    }

    const res = await changePassword(
      credentials.currentPassword,
      credentials.newPassword
    );

    if (res.success) {
      showAlert("Password updated ✅", "success");
      setCredentials({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      showAlert(res.error || "Failed ❌", "danger");
    }
  };

  // ================= 2FA =================
  const handleTwoFAToggle = () => {
    if (!twofactor) {
      setShow2FAModal(true);
    } else {
      showAlert("2FA disable backend se handle karo", "warning");
    }
  };

  const confirm2FA = async () => {
  if (twoFAPin.length !== 4) {
    showAlert("4 digit PIN required ❌", "danger");
    return;
  }

  const res = await enableTwoFA(twoFAPin);

  if (res.success) {
    setTwoFA(true);
    setTwoFALastVerified();
    showAlert("2FA enabled ✅", "success");
    setShow2FAModal(false);
    setTwoFAPin("");
  } else {
    showAlert(res.error || "Failed ❌", "danger");
  }
};

const confirm2FAVerification = async () => {
  if (verifyPin.length !== 4) {
    showAlert("4 digit PIN required ❌", "danger");
    return;
  }

  // 🔹 use verifyPin for verifying existing 2FA
  const res = await verify2FA(verifyPin);

  if (res.success) {
    setTwoFALastVerified();
    setShowVerify2FAModal(false);
    showAlert("Verified ✅", "success");
    setVerifyPin(""); // clear input
  } else {
    showAlert(res.error || "Incorrect PIN ❌", "danger");
  }
};

  // ================= ACCOUNT =================
  const confirmDelete = async () => {
    const res = await deleteAccount();
    if (res.success) {
      localStorage.removeItem("auth-token");
      navigate("/login");
    }
    setShowDeleteModal(false);
  };

  /*const confirmDeactivate = async () => {
    const res = await deactivateAccount();
    if (res.success) {
      navigate("/login");
    }
    setShowDeactivateModal(false);
  };*/

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  // ================= JSX =================
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={title}>⚙️ Account Settings</h2>

        <h4 style={sectionTitle}>Change Password</h4>
        <form onSubmit={handlePasswordChange}>
          <input type="password" name="currentPassword" value={credentials.currentPassword} onChange={onChange} placeholder="Current Password" required style={inputStyle} />
          <input type="password" name="newPassword" value={credentials.newPassword} onChange={onChange} placeholder="New Password" required style={inputStyle} />
          <input type="password" name="confirmPassword" value={credentials.confirmPassword} onChange={onChange} placeholder="Confirm Password" required style={inputStyle} />
          <button type="submit" style={btnStyle}>Update Password</button>
        </form>

        <h4 style={sectionTitle}>Security</h4>
        <div style={toggleContainer}>
          <label style={{ color: "#e2e8f0" }}>Enable Two-Factor Authentication</label>
          <input type="checkbox" checked={twofactor} onChange={handleTwoFAToggle} />
        </div>

        <h4 style={{ ...sectionTitle, color: "#f87171" }}>Danger Zone</h4>
        <button style={{ ...btnStyle, background: "#a41111ff" }} onClick={() => setShowDeleteModal(true)}>Delete Account</button>
       {/* <button style={{ ...btnStyle, background: "#EAB308", color: "#1E293B" }} onClick={() => setShowDeactivateModal(true)}>Deactivate Account</button>*/}
      </div>

      {show2FAModal && modal("Set 2FA PIN", twoFAPin, setTwoFAPin, confirm2FA)}
      {showVerify2FAModal && modal("Verify 2FA", verifyPin, setVerifyPin, confirm2FAVerification)}
      {showDeleteModal && confirmModal("Delete Account", confirmDelete, setShowDeleteModal)}
       
    </div>
  );
};

/* ===== STYLES (UNCHANGED) ===== */
const pageStyle = { minHeight: "100vh", background: "linear-gradient(to bottom right,#0f172a,#41b19cff)", padding: "40px 20px", display: "flex", justifyContent: "center" };
const cardStyle = { background: "linear-gradient(135deg,rgba(15,32,39,.85),rgba(32,58,67,.85),rgba(44,83,100,.9))", padding: "30px", borderRadius: "18px", width: "100%", maxWidth: "650px" };
const title = { color: "#f8fafc", textAlign: "center", marginBottom: "25px" };
const sectionTitle = { marginTop: "25px", marginBottom: "12px", color: "#93c5fd" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #334155", marginBottom: "12px", backgroundColor: "#0f172a", color: "#f8fafc" };
const btnStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "none", background: "linear-gradient(to right,#2563eb,#1e40af)", color: "white", fontWeight: "600", cursor: "pointer", marginTop: "10px" };
const toggleContainer = { display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1e293b", padding: "12px", borderRadius: "10px" };

const modal = (title, value, setValue, onConfirm) => (
  <div style={overlay}>
    <div style={modalBox}>
      <h3>{title}</h3>
      <input type="password" maxLength={4} value={value} onChange={(e) => setValue(e.target.value)} style={inputStyle} />
      <button style={btnStyle} onClick={onConfirm}>Confirm</button>
    </div>
  </div>
);

const confirmModal = (title, onConfirm, setClose) => (
  <div style={overlay}>
    <div style={modalBox}>
      <h3>{title}</h3>
      <button style={btnStyle} onClick={onConfirm}>Yes</button>
      <button style={btnStyle} onClick={() => setClose(false)}>Cancel</button>
    </div>
  </div>
);

const overlay = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,.6)", display: "flex", justifyContent: "center", alignItems: "center" };
const modalBox = { background: "#1e293b", padding: "25px", borderRadius: "12px", width: "90%", maxWidth: "400px", color: "#f8fafc" };

export default Settings;
