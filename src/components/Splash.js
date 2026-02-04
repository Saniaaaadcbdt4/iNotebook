import React, { useEffect } from "react";
import "./Splash.css";

const Splash = ({ visible, onFinish, target = "/" }) => {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
      // target is just the route string, HashRouter handles # automatically
      window.location.hash = target; 
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [visible, onFinish, target]);

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
