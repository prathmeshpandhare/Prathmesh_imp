import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyDashboard = ({ companyId }) => {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    axios
      .get(`https://prathmesh-imp.vercel.app/api/parcels/company/${companyId}`)
      .then((res) => setParcels(res.data))
      .catch((err) => console.error(err));
  }, [companyId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Company Dashboard</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Location</th>
            <th>Van Available</th>
            <th>Delivery Days</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td>{parcel.location}</td>
              <td>{parcel.vanAvailable ? "Yes" : "No"}</td>
              <td>{parcel.deliveryDays}</td>
              <td>{parcel.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyDashboard;
