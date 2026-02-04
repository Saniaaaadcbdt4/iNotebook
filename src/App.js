import "./App.css";
import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Homes from "./components/home";
import Abouts from "./components/Abouts";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Addyournotehere from "./components/Addyournotehere";
import Feedback from "./components/Feedback";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import NoteDetail from "./components/noteDetail";
import Otp from "./components/Otp";
import Splash from "./components/Splash";

function App() {
  const [alert, setAlert] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 1500);
  };

  return (
    <NoteState>
      <Router>
        <ScrollToTop />

        {/* Splash overlay */}
        <Splash
          visible={showSplash}
          onFinish={() => setShowSplash(false)}
          target="/" // HashRouter will handle this correctly
        />

        {/* Only render Navbar + Routes when splash is hidden */}
        {!showSplash && (
          <>
            <Navbar setSearchQuery={setSearchQuery} />
            <Alert alert={alert} />

            <Routes>
              <Route path="/" element={<Homes showAlert={showAlert} />} />
              <Route path="/about" element={<Abouts />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route path="/addnote" element={<AddNote showAlert={showAlert} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings showAlert={showAlert} />} />
              <Route path="/note/:id" element={<NoteDetail />} />
              <Route path="/notes" element={<Notes showAlert={showAlert} searchQuery={searchQuery} />} />
              <Route path="/mynotes" element={<Notes showAlert={showAlert} showOnly="mynotes" searchQuery={searchQuery} />} />
              <Route path="/addyournotehere" element={<Addyournotehere showAlert={showAlert} />} />
              <Route path="/Otp" element={<Otp showAlert={showAlert} />} />
              <Route path="/feedback" element={<Feedback showAlert={showAlert} />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/footer" element={<Footer />} />
            </Routes>
          </>
        )}
      </Router>
    </NoteState>
  );
}

export default App;
