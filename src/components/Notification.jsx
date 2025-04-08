import React from "react";
import "../styles/Notification.css"; // Подключаем стили для уведомлений

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      <div className="notification-message">
        {message}
        <button onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Notification;
