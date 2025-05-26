import React, { useState, useEffect } from "react";
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";

const API_BASE = "https://prathmesh-imp.vercel.app/api/vans";

const Vans = () => {
  const [vanBookings, setVanBookings] = useState([]);
  const [newVan, setNewVan] = useState({
    vanNumber: "",
    bookedDays: "",
    amount: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVans();
  }, []);

  const fetchVans = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/getall`);
      if (!res.ok) throw new Error("Failed to fetch vans");
      const data = await res.json();
      setVanBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewVan({ ...newVan, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!newVan.vanNumber || !newVan.bookedDays || !newVan.amount) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newVan,
          bookedDays: Number(newVan.bookedDays),
          amount: Number(newVan.amount),
        }),
      });
      if (!res.ok) throw new Error("Failed to add van");
      await fetchVans();
      setNewVan({ vanNumber: "", bookedDays: "", amount: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    const van = vanBookings.find((v) => v._id === id);
    if (!van) return;
    setNewVan({
      vanNumber: van.vanNumber,
      bookedDays: van.bookedDays,
      amount: van.amount,
    });
    setEditingId(id);
  };

  const handleSave = async () => {
    if (!newVan.vanNumber || !newVan.bookedDays || !newVan.amount) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newVan,
          bookedDays: Number(newVan.bookedDays),
          amount: Number(newVan.amount),
        }),
      });
      if (!res.ok) throw new Error("Failed to update van");
      await fetchVans();
      setNewVan({ vanNumber: "", bookedDays: "", amount: "" });
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete van");
      await fetchVans();
      if (editingId === id) {
        setNewVan({ vanNumber: "", bookedDays: "", amount: "" });
        setEditingId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Van Records</h2>
      <p className="mb-4 text-gray-600">
        Manage how many days each van is booked and for how much.
      </p>

      {/* Form for Add/Edit */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <input
          name="vanNumber"
          value={newVan.vanNumber}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Van Number"
        />
        <input
          name="bookedDays"
          type="number"
          value={newVan.bookedDays}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Booked Days"
        />
        <input
          name="amount"
          type="number"
          value={newVan.amount}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Total Amount"
        />
      </div>

      <button
        onClick={editingId ? handleSave : handleAdd}
        className={`flex items-center gap-2 ${
          editingId ? "bg-green-600" : "bg-blue-600"
        } text-white px-4 py-2 rounded mb-4`}
      >
        <HiPlus />
        {editingId ? "Save Van" : "Add Van"}
      </button>

      {loading ? (
        <p>Loading vans...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border-b">Sr. No.</th>
                <th className="text-left px-4 py-2 border-b">Van Number</th>
                <th className="text-left px-4 py-2 border-b">Booked Days</th>
                <th className="text-left px-4 py-2 border-b">
                  Total Amount (₹)
                </th>
                <th className="text-left px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vanBookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No van records available.
                  </td>
                </tr>
              )}
              {vanBookings.map((van, index) => (
                <tr key={van._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>{" "}
                  {/* Sr No */}
                  <td className="px-4 py-2 border-b">{van.vanNumber}</td>
                  <td className="px-4 py-2 border-b">{van.bookedDays}</td>
                  <td className="px-4 py-2 border-b">
                    ₹{van.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b flex gap-2">
                    <button
                      onClick={() => handleEdit(van._id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <HiPencil /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(van._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                      <HiTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Vans;
