import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationDropdown = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${userId}`
      );
      setNotifications(res.data.reverse()); // Latest on top
    } catch (err) {
      console.error("Failed to fetch notifications:", err.message);
    }
  };

  useEffect(() => {
    if (userId) fetchNotifications();
  }, [userId]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-dark dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
      >
        Notifications
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        {notifications.length === 0 && (
          <li className="dropdown-item text-muted">No notifications</li>
        )}
        {notifications.map((n, index) => (
          <li key={index} className="dropdown-item">
            <div className="fw-bold">{n.userType}</div>
            <div>{n.message}</div>
            <small className="text-muted">
              {new Date(n.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
