import React from "react";
import { useState } from "react";
import "./ConfirmPopup.css";
import { data } from "react-router-dom";

const ConfirmationPopup = ({
  isOpen,
  onClose,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Yes",
  cancelText = "No",
  isDanger = false,
  updateData,
}) => {
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);


  if (!isOpen) return null;

  const handleConfirm = async () => {
    console.log("Confirming action with data:", updateData);
    if (updateData.type === "checkbox") {
      setLoading(true);
      //for updating top status
      const { storyId, period } = updateData;
      const update = await fetch(
        `http://localhost:5000/api/admin/stories/top/status/${storyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ period }),
        },
      );
      const data = await update.json();
      if (data.success) {
        setLoading(false);
        console.log("Top status updated successfully", data);
        onClose();
      } else {
        console.error("Failed to update top status");
        setMessageText(
          data.message || "Failed to update top status. Please try again.",
        );
        setLoading(false);
      }
    } else if (updateData.type === "publish") {
      //for updating publish status
    }
  };

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-popup">
        <div className="confirmation-header">
          <h3>{title}</h3>
          <button disabled={loading} 
          className="close-btn" 
          onClick={onClose}>
            ×
          </button>
        </div>

        <div className="confirmation-body">
          <p className="message">{message}</p>
          <p className="failedmessage">{messageText}</p>
        </div>

        <div className="confirmation-footer">
          <button disabled={loading} className="cancel-btn" onClick={onClose}>
            {cancelText}
          </button>
          <button
            disabled={loading}
            className={`confirm-btn ${isDanger ? "danger" : ""}`}
            onClick={() => {
              handleConfirm();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
