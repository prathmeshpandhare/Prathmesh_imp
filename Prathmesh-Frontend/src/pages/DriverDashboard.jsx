import React from "react";
import axios from "axios";

const DriverDashboard = ({ parcel }) => {
  const sendNotification = async () => {
    const recipients = [
      { userId: parcel.ownerId, userType: "Owner" },
      { userId: parcel.companyId, userType: "Company" },
      { userId: "admin", userType: "Admin" },
    ];

    for (let recipient of recipients) {
      await axios.post(
        "https://prathmesh-imp.vercel.app/api/notifications/create",
        {
          ...recipient,
          message: `Parcel delivered to ${parcel.location}`,
        }
      );
    }

    alert("Notifications sent");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Driver Dashboard</h2>
      <p>Location: {parcel.location}</p>
      <button
        className="mt-4 p-2 bg-blue-600 text-white"
        onClick={sendNotification}
      >
        Notify Delivery Completion
      </button>
    </div>
  );
};

export default DriverDashboard;
