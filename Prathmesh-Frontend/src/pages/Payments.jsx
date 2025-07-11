import React, { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const Payments = () => {
  const [owners, setOwners] = useState([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState("");
  const [vans, setVans] = useState([]);
  const [payments, setPayments] = useState([]);

  const [formData, setFormData] = useState({
    ownerId: "",
    ownerName: "",
    vanNumber: "",
    actualAmount: "",
    totalAmount: "",
    date: "",
    status: "Pending",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Role handling
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  if (role === "driver") return null;

  const canAdd = role === "admin";
  const canEdit = role === "admin";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/owners/getall`)
      .then((res) => setOwners(res.data))
      .catch((err) => console.error("Error fetching owners:", err));

    axios
      .get(`${BASE_URL}/payments/getall`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Error fetching payments:", err));
  }, []);

  const handleOwnerChange = (e) => {
    const ownerId = e.target.value;
    const owner = owners.find((o) => o._id === ownerId);

    setSelectedOwnerId(ownerId);
    setFormData((prev) => ({
      ...prev,
      ownerId,
      ownerName: owner?.name || "",
      vanNumber: "",
    }));

    if (ownerId) {
      axios
        .get(`${BASE_URL}/vans/by-owner/${ownerId}`)
        .then((res) => {
          const vansList = res.data.map((van) => van.vanNumber);
          setVans(vansList);
        })
        .catch((err) => {
          console.error("Error fetching vans:", err);
          setVans([]);
        });
    } else {
      setVans([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdate = () => {
    const { ownerName, vanNumber, actualAmount, totalAmount, date } = formData;

    if (!ownerName || !vanNumber || !actualAmount || !totalAmount || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = {
      ...formData,
      actualAmount: Number(actualAmount),
      totalAmount: Number(totalAmount),
    };

    if (isEditing) {
      axios
        .put(`${BASE_URL}/payments/update/${formData._id}`, payload)
        .then((res) => {
          const updated = [...payments];
          updated[editIndex] = res.data;
          setPayments(updated);
          resetForm();
        })
        .catch((err) => console.error("Error updating payment:", err));
    } else {
      axios
        .post(`${BASE_URL}/payments/add`, payload)
        .then((res) => {
          setPayments((prev) => [...prev, res.data]);
          resetForm();
        })
        .catch((err) => console.error("Error adding payment:", err));
    }
  };

  const resetForm = () => {
    setFormData({
      ownerId: "",
      ownerName: "",
      vanNumber: "",
      actualAmount: "",
      totalAmount: "",
      date: "",
      status: "Pending",
    });
    setSelectedOwnerId("");
    setVans([]);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleEdit = (payment, index) => {
    setFormData(payment);
    setSelectedOwnerId(payment.ownerId);

    if (payment.ownerId) {
      axios
        .get(`${BASE_URL}/vans/by-owner/${payment.ownerId}`)
        .then((res) => {
          const vansList = res.data.map((van) => van.vanNumber);
          setVans(vansList);
        })
        .catch((err) => {
          console.error("Error fetching vans:", err);
          setVans([]);
        });
    } else {
      setVans([]);
    }

    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const paymentId = payments[index]._id;
    axios
      .delete(`${BASE_URL}/payments/delete/${paymentId}`)
      .then(() => {
        setPayments((prev) => prev.filter((_, i) => i !== index));
      })
      .catch((err) => console.error("Error deleting payment:", err));
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>
      <p className="mb-4 text-gray-600">Track payments given to van owners.</p>

      {canAdd && (
        <>
          <div className="grid md:grid-cols-6 gap-4 mb-6">
            <select
              className="border p-2 rounded col-span-2"
              name="ownerId"
              value={selectedOwnerId}
              onChange={handleOwnerChange}
            >
              <option value="">Select Owner</option>
              {owners.map((owner) => (
                <option key={owner._id} value={owner._id}>
                  {owner.name}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded col-span-1"
              name="vanNumber"
              value={formData.vanNumber}
              onChange={handleInputChange}
            >
              <option value="">Select Van</option>
              {vans.map((van, index) => (
                <option key={index} value={van}>
                  {van}
                </option>
              ))}
            </select>

            <input
              className="border p-2 rounded col-span-1"
              name="actualAmount"
              placeholder="Actual Amount"
              type="number"
              value={formData.actualAmount}
              onChange={handleInputChange}
            />

            <input
              className="border p-2 rounded col-span-1"
              name="totalAmount"
              placeholder="Total Amount"
              type="number"
              value={formData.totalAmount}
              onChange={handleInputChange}
            />

            <input
              className="border p-2 rounded col-span-1"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            onClick={handleAddOrUpdate}
          >
            <HiPlus className="text-xl" />
            {isEditing ? "Update Payment" : "Add Payment"}
          </button>
        </>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Owner Name</th>
              <th className="text-left px-4 py-2 border-b">Van Number</th>
              {role === "admin" && (
                <th className="text-left px-4 py-2 border-b">
                  Actual Amount (₹)
                </th>
              )}
              <th className="text-left px-4 py-2 border-b">Total Amount (₹)</th>
              <th className="text-left px-4 py-2 border-b">Date</th>
              <th className="text-left px-4 py-2 border-b">Status</th>
              {canEdit && (
                <th className="text-left px-4 py-2 border-b">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id || index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{payment.ownerName}</td>
                <td className="px-4 py-2 border-b">{payment.vanNumber}</td>
                {role === "admin" && (
                  <td className="px-4 py-2 border-b">
                    ₹{payment.actualAmount?.toLocaleString()}
                  </td>
                )}
                <td className="px-4 py-2 border-b">
                  ₹{payment.totalAmount?.toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b">{payment.date}</td>
                <td
                  className={`px-4 py-2 border-b font-medium ${
                    payment.status === "Paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {payment.status}
                </td>
                {canEdit && (
                  <td className="px-4 py-2 border-b space-x-2">
                    <button
                      onClick={() => handleEdit(payment, index)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <HiPencil className="inline-block text-xl" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <HiTrash className="inline-block text-xl" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
