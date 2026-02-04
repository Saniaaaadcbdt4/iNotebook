import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
// Components
import Navbar from "./components/Navbar";
import Homes from "./components/home"; // lowercase match with file
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
import NoteDetail from "./components/noteDetail"; // lowercase match
import Otp from "./components/Otp"; // lowercase match
//import Splash from "./components/Splash";


function App() {
  const [alert, setAlert] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 search state
  //const [showSplash, setShowSplash] = useState(true);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 1500);
  };

  return (
    <NoteState>
  <Router basename="/iNotebook">
    <ScrollToTop />

    {/* Splash overlay 
    <Splash
      visible={showSplash}
      onFinish={() => setShowSplash(false)}
      target="/"
    />

    {/* Only render Navbar + Routes when splash is hidden 
    {!showSplash && (
      <>*/}
        <Navbar setSearchQuery={setSearchQuery} />
        <Alert alert={alert} />

        <Routes>
          <Route path="/footer" element={<Footer />} />
          <Route path="/" element={<Homes showAlert={showAlert} />} />
          <Route path="/about" element={<Abouts />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/addnote" element={<AddNote showAlert={showAlert} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings showAlert={showAlert} />} />
          <Route path="/note/:id" element={<NoteDetail />} />

          <Route
            path="/notes"
            element={<Notes showAlert={showAlert} searchQuery={searchQuery} />}
          />
          <Route
            path="/mynotes"
            element={
              <Notes
                showAlert={showAlert}
                showOnly="mynotes"
                searchQuery={searchQuery}
              />
            }
          />
       <Route
            path="/addyournotehere"
            element={<Addyournotehere showAlert={showAlert} />}
          />
          <Route path="/Otp" element={<Otp showAlert={showAlert} />} />
          <Route path="/feedback" element={<Feedback showAlert={showAlert} />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      
    
  </Router>
</NoteState>
 
  );
}

export default App;
