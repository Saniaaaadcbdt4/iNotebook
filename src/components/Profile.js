import React, { useState, useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Image from "../Images/image4.png";

const Profile = (props) => {
  const context = useContext(noteContext);
  const { getProfile, updateProfile, profile } = context;
  const [bioValid, setBioValid] = useState(true);

  const [profileState, setProfileState] = useState({
    name: "",
   // email: "",
    bio: "",
    joined: "",
  });

  const [isChanged, setIsChanged] = useState(false); // ✅ Track changes
  const [success, setSuccess] = useState(false); // ✅ Success prompt

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (profile) {
      setProfileState(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    setProfileState({ ...profileState, [e.target.name]: e.target.value });
    setIsChanged(true); // ✅ Enable Save button when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileState);
    setIsChanged(false); // ✅ Disable button again after saving
    setSuccess(true); // ✅ Show success message

    // Hide success message after 3s
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `
      linear-gradient(rgba(15,32,39,0.85), rgba(32,58,67,0.85), rgba(44,83,100,0.9)),
      url(${Image})
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "50px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          background: "rgba(13, 60, 99, 0.08)",
          backdropFilter: "blur(14px)",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "600px",
         boxShadow:"0 4px 30px rgba(255, 255, 255, 0.2), 0 12px 60px rgba(255, 255, 255, 0.1)",
          transition: "transform 0.3s ease",
        }}
      >
        <h2
          style={{
            color: "#f1f5f9",
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "1.8rem",
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          My Profile
        </h2>

        {/* Avatar Circle */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "4px solid #38bdf8",
              margin: "0 auto",
              background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "700",
              color: "white",
            }}
          >
            {profileState.name
              ? profileState.name.charAt(0).toUpperCase()
              : "U"}
          </div>
        </div>

        {/* Success Prompt */}
        {success && (
          <div
            style={{
              background: "#22c55e",
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            ✅ Profile Updated Successfully!
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit} noValidate>
         
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            name="name"
            value={profileState.name || ""}
            onChange={handleChange}
            style={inputStyle}
          />

          {/*<label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={profileState.email || ""}
            onChange={handleChange}
            style={inputStyle}
          />*/}       
          <label style={labelStyle}>Bio</label>
          <textarea
            name="bio"
            value={profileState.bio || ""}
            onChange={(e)=>{
              handleChange(e);
              setBioValid(e.target.value.trim() !== "");
            }}
            style={{
    ...inputStyle,
    minHeight: "100px",
    border: bioValid ? "1px solid #ccc" : "1px solid #ccc", // red line hata diya
  }}
  placeholder="📝 Share your permanent thought..."
  spellCheck={false}
/>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "15px",
              fontSize: "0.95rem",
              textAlign: "center",
            }}
          >
            📅 Joined:{" "}
            <strong style={{ color: "#f8fafc" }}>
              {profile.joined
                ? new Date(profile.joined).toLocaleDateString()
                : "N/A"}
            </strong>
          </p>

          <button
            type="submit"
            disabled={!isChanged} // ✅ Disable until changes
            style={{
              ...btnStyle,
              opacity: isChanged ? 1 : 0.6,
              cursor: isChanged ? "pointer" : "not-allowed",
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ Shared Styles
const labelStyle = {
  display: "block",
  marginBottom: "6px",
  color: "#cbd5e1",
  fontWeight: "500",
  fontSize: "0.95rem",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #334155",
  marginBottom: "18px",
  backgroundColor: "rgba(15,23,42,0.9)",
  color: "#f8fafc",
  fontSize: "0.95rem",
  transition: "all 0.2s ease-in-out",
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "white",
  fontWeight: "600",
  fontSize: "1rem",
  marginTop: "25px",
  boxShadow: "0px 6px 20px rgba(37,99,235,0.4)",
  transition: "all 0.3s ease-in-out",
};

export default Profile;
