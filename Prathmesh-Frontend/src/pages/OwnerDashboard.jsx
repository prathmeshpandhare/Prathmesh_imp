import React, { useEffect, useState } from "react";
import axios from "axios";

const OwnerDashboard = () => {
  const [vans, setVans] = useState([]);
  const [counts, setCounts] = useState({
    totalVans: 0,
    available: 0,
    booked: 0,
  });

  const ownerId = sessionStorage.getItem("id");
  const ownerName = sessionStorage.getItem("name");

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const res = await axios.get(
          `https://prathmesh-imp.vercel.app/api/vans/owner/${ownerId}`
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setVans(data);
      } catch (err) {
        console.error("Failed to fetch vans:", err);
        setVans([]);
      }
    };

    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          `https://prathmesh-imp.vercel.app/api/owners/stats/${ownerId}`
        );
        setCounts(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchVans();
    fetchCounts();
  }, [ownerId]);

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Welcome, <strong>{ownerName}</strong>! Here's a summary of your vans.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total Vans</h3>
          <p className="text-2xl">{counts.totalVans}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Available</h3>
          <p className="text-2xl">{counts.available}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Booked</h3>
          <p className="text-2xl">{counts.booked}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Van ID</th>
              <th className="text-left px-4 py-2 border-b">Status</th>
              <th className="text-left px-4 py-2 border-b">City</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(vans) &&
              vans.map((van) => (
                <tr key={van._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{van.vanNumber}</td>
                  <td
                    className={`px-4 py-2 border-b font-medium ${
                      van.status === "Available"
                        ? "text-green-600"
                        : van.status === "Booked"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {van.status}
                  </td>
                  <td className="px-4 py-2 border-b">{van.city}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerDashboard;
