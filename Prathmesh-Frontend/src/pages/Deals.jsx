import React, { useState, useEffect } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";

const API_BASE = "https://prathmesh-imp.onrender.com/api/deals";
const OWNERS_API = "https://prathmesh-imp.onrender.com/api/owners/getall";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [owners, setOwners] = useState([]);
  const [newDeal, setNewDeal] = useState({
    vanId: "",
    ownerId: "",
    amount: "",
    status: "pending",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ownersLoading, setOwnersLoading] = useState(false);

  useEffect(() => {
    fetchOwners();
    fetchDeals();
  }, []);

  const fetchOwners = async () => {
    setOwnersLoading(true);
    try {
      const res = await fetch(OWNERS_API);
      if (!res.ok) throw new Error("Failed to fetch owners");
      const data = await res.json();
      setOwners(data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    } finally {
      setOwnersLoading(false);
    }
  };

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/getall`);
      if (!res.ok) throw new Error("Failed to fetch deals");
      const data = await res.json();
      setDeals(data);
    } catch (error) {
      console.error("Failed to fetch deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const { vanId, ownerId, amount } = newDeal;
    if (!vanId || !ownerId || !amount) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDeal),
      });
      if (!res.ok) throw new Error("Failed to add deal");
      await fetchDeals();
      setNewDeal({
        vanId: "",
        ownerId: "",
        amount: "",
        status: "pending",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    const selected = deals.find((d) => d._id === id);
    setNewDeal({
      vanId: selected.vanId,
      ownerId: selected.ownerId,
      amount: selected.amount,
      status: selected.status,
    });
    setEditingId(id);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_BASE}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDeal),
      });
      if (!res.ok) throw new Error("Failed to update deal");
      await fetchDeals();
      setNewDeal({
        vanId: "",
        ownerId: "",
        amount: "",
        status: "pending",
      });
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete deal");
      await fetchDeals();
      if (editingId === id) {
        setEditingId(null);
        setNewDeal({
          vanId: "",
          ownerId: "",
          amount: "",
          status: "pending",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Get owner name by id from fetched owners
  const getOwnerName = (ownerId) => {
    const owner = owners.find((o) => o._id === ownerId);
    return owner ? owner.name : ownerId;
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Deals</h2>
      <p className="mb-4 text-gray-600">Track transport deals here.</p>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
        <input
          name="vanId"
          value={newDeal.vanId}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Van ID"
          required
        />
        {/* Owners dropdown */}
        <select
          name="ownerId"
          value={newDeal.ownerId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
          disabled={ownersLoading}
        >
          <option value="">Select Owner</option>
          {owners.map((owner) => (
            <option key={owner._id} value={owner._id}>
              {owner.name}
            </option>
          ))}
        </select>
        <input
          name="amount"
          type="number"
          value={newDeal.amount}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Amount"
          required
        />
        <select
          name="status"
          value={newDeal.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <button
        onClick={editingId ? handleSave : handleAdd}
        className={`flex items-center gap-2 ${
          editingId ? "bg-green-600" : "bg-blue-600"
        } text-white px-4 py-2 rounded mb-4`}
      >
        <HiPlus />
        {editingId ? "Save Deal" : "Add Deal"}
      </button>

      {loading && <p>Loading deals...</p>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left">Sr. No.</th>
              <th className="px-4 py-2 border-b text-left">Van ID</th>
              <th className="px-4 py-2 border-b text-left">Owner Name</th>
              <th className="px-4 py-2 border-b text-left">Amount</th>
              <th className="px-4 py-2 border-b text-left">Status</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No deals available.
                </td>
              </tr>
            )}
            {deals.map((deal, index) => (
              <tr key={deal._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{deal.vanId}</td>
                <td className="px-4 py-2 border-b">
                  {getOwnerName(deal.ownerId)}
                </td>
                <td className="px-4 py-2 border-b">{deal.amount}</td>
                <td
                  className={`px-4 py-2 border-b font-semibold ${
                    deal.status === "approved"
                      ? "text-green-600"
                      : deal.status === "rejected"
                      ? "text-red-500"
                      : "text-yellow-600"
                  }`}
                >
                  {deal.status}
                </td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button
                    onClick={() => handleEdit(deal._id)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <HiPencil /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(deal._id)}
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
    </div>
  );
};

export default Deals;
