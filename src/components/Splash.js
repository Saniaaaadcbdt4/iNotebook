import React, { useEffect } from "react";
import "./Splash.css"; // create this file (styles below)
import { useNavigate } from "react-router-dom";

const Splash = ({ visible, onFinish, target = "/" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      // finish callback so parent can hide splash
      if (onFinish) onFinish();
      navigate(target);
    }, 4000); // 3 seconds
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="splash-overlay">
      <div className="splash-card">
        <h1 className="splash-title">iNotebook</h1>
        <p className="splash-sub">by Sania Ahmed</p>
      </div>
      <div className="splash-login">Login</div>
    </div>
  );
};

export default Splash;
