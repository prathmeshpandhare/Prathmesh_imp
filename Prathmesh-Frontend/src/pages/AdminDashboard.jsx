import React, { useEffect, useState } from "react";
import { Users, Truck, Briefcase, CheckCircle, Clock } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDeals: 0,
    registeredVans: 0,
    vanOwners: 0,
    isBooked: 0,
    isAvailable: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://prathmesh-imp.onrender.com/api/dashboard/stats"
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  const widgets = [
    {
      title: "Total Deals",
      count: stats.totalDeals,
      icon: <Briefcase className="w-8 h-8 text-blue-500" />,
      bg: "bg-blue-100",
    },
    {
      title: "Registered Vans",
      count: stats.registeredVans,
      icon: <Truck className="w-8 h-8 text-green-500" />,
      bg: "bg-green-100",
    },
    {
      title: "Van Owners",
      count: stats.vanOwners,
      icon: <Users className="w-8 h-8 text-purple-500" />,
      bg: "bg-purple-100",
    },
    {
      title: "Is Booked",
      count: stats.isBooked,
      icon: <CheckCircle className="w-8 h-8 text-red-500" />,
      bg: "bg-red-100",
    },
    {
      title: "Is Available",
      count: stats.isAvailable,
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
      bg: "bg-yellow-100",
    },
  ];

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <p className="mb-6 text-gray-600">
        Welcome! Manage deals, vans, and owners from your dashboard.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {widgets.map((widget, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-sm flex items-center ${widget.bg}`}
          >
            <div className="mr-4">{widget.icon}</div>
            <div>
              <div className="text-xl font-semibold">{widget.count}</div>
              <div className="text-gray-700">{widget.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
