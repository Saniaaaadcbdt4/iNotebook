import React, { useEffect, useState } from "react";

const Alert = ({ alert }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alert) {
      setVisible(true);

      // Auto close after 3s
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (!alert || !visible) return null;

  // Professional styles with softer wording
  const alertStyles = {
    completed: {
      bg: "#ecfdf5",
      border: "#10b981",
      color: "#065f46",
      icon: "✅",
      label: "Completed",
    },
    failed: {
      bg: "#fef2f2",
      border: "#ef4444",
      color: "#7f1d1d",
      icon: "🚫",
      label: "Action Failed",
    },
    note: {
      bg: "#eff6ff",
      border: "#3b82f6",
      color: "#1e3a8a",
      icon: "💡",
      label: "Note",
    },
    attention: {
      bg: "#fffbeb",
      border: "#f59e0b",
      color: "#92400e",
      icon: "⚡",
      label: "Attention Needed",
    },
  };

  const style = alertStyles[alert.type] || alertStyles.note;

  return (
    <div
      style={{
        position: "fixed",
        top: "3.5rem",
        right: "20px",
        minWidth: "270px",
        padding: "14px 18px",
        backgroundColor: style.bg,
        borderLeft: `6px solid ${style.border}`,
        borderRadius: "10px",
        color: style.color,
        fontWeight: "500",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        animation: "fadeIn 0.3s ease-in-out",
        zIndex: 1000,
      }}
    >
      <span style={{ fontSize: "20px" }}>{style.icon}</span>
      <span>
        <strong>{style.label}</strong> — {alert.msg}
      </span>
    </div>
  );
};

export default Alert;
