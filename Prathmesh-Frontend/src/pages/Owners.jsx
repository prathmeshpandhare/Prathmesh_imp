import React, { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import axios from "axios";
import Select from "react-select";
import "./owner.css";
const Owners = () => {
  const [owners, setOwners] = useState([]);
  const [allVans, setAllVans] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const API_BASE = "https://prathmesh-imp.onrender.com";

  const [form, setForm] = useState({
    name: "",
    contact: "",
    city: "",
    vansAvailable: "",
    vanNumbers: [],
  });

  useEffect(() => {
    fetchOwners();
    fetchAllVans();
  }, []);

  const fetchOwners = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/owners/getall`);
      setOwners(res.data);
    } catch (err) {
      console.error("Failed to fetch owners", err);
    }
  };

  const fetchAllVans = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/vans/getall`);
      setAllVans(res.data);
    } catch (err) {
      console.error("Failed to fetch vans", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.contact ||
      !form.city ||
      form.vansAvailable === "" ||
      form.vanNumbers.length === 0
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/api/owners/${editingId}`, {
          ...form,
          vansAvailable: parseInt(form.vansAvailable),
        });
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE}/api/owners/add`, {
          ...form,
          vansAvailable: parseInt(form.vansAvailable),
        });
      }
      setForm({
        name: "",
        contact: "",
        city: "",
        vansAvailable: "",
        vanNumbers: [],
      });
      fetchOwners();
    } catch (err) {
      console.error("Error saving owner", err);
    }
  };

  const handleEdit = (owner) => {
    setForm({
      name: owner.name,
      contact: owner.contact,
      city: owner.city,
      vansAvailable: owner.vansAvailable,
      vanNumbers: Array.isArray(owner.vanNumbers) ? owner.vanNumbers : [],
    });
    setEditingId(owner._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this owner?")) {
      try {
        await axios.delete(`${API_BASE}/api/owners/${id}`);
        fetchOwners();
      } catch (err) {
        console.error("Error deleting owner", err);
      }
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Owners</h2>
      <p className="mb-4 text-gray-600">
        List and manage transport owners and van availability.
      </p>

      {/* Form */}
      <form
        onSubmit={handleAddOrUpdate}
        className="mb-6 grid gap-4 grid-cols-2"
      >
        <input
          name="name"
          placeholder="Owner Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="contact"
          placeholder="Contact"
          className="border p-2 rounded"
          value={form.contact}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          className="border p-2 rounded"
          value={form.city}
          onChange={handleChange}
        />
        <input
          name="vansAvailable"
          type="number"
          placeholder="Vans Available"
          className="border p-2 rounded"
          value={form.vansAvailable}
          onChange={handleChange}
        />

        <div className="col">
          <Select
            isMulti
            name="vanNumbers"
            options={allVans.map((van) => ({
              value: van.vanNumber,
              label: van.vanNumber,
            }))}
            value={allVans
              .filter((van) => form.vanNumbers.includes(van.vanNumber))
              .map((van) => ({
                value: van.vanNumber,
                label: van.vanNumber,
              }))}
            onChange={(selectedOptions) =>
              setForm({
                ...form,
                vanNumbers: selectedOptions.map((opt) => opt.value),
              })
            }
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select one or more vans"
          />
        </div>

        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mx-auto"
          >
            {editingId ? (
              <>
                <HiPencil /> Update Owner
              </>
            ) : (
              <>
                <HiPlus /> Add Owner
              </>
            )}
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Sr. No.</th>
              <th className="text-left px-4 py-2 border-b">Owner Name</th>
              <th className="text-left px-4 py-2 border-b">Contact</th>
              <th className="text-left px-4 py-2 border-b">City</th>
              <th className="text-left px-4 py-2 border-b">Vans Available</th>
              <th className="text-left px-4 py-2 border-b">Van Numbers</th>
              <th className="text-left px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners?.map((owner, index) => (
              <tr key={owner._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{owner.name}</td>
                <td className="px-4 py-2 border-b">{owner.contact}</td>
                <td className="px-4 py-2 border-b">{owner.city}</td>
                <td
                  className={`px-4 py-2 border-b font-medium ${
                    owner.vansAvailable > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {owner.vansAvailable}
                </td>
                <td className="px-4 py-2 border-b">
                  {Array.isArray(owner.vanNumbers) &&
                  owner.vanNumbers.length > 0
                    ? owner.vanNumbers.join(", ")
                    : "—"}
                </td>
                <td className="px-4 py-2 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(owner)}
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    <HiPencil /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(owner._id)}
                    className="text-red-600 hover:underline inline-flex items-center gap-1"
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

export default Owners;
