import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";

const TransportRecord = () => {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [formData, setFormData] = useState({
    serialNumber: "",
    dateOfLoading: "",
    advancePayment: "",
    station: "",
    loadedWeight: "",
    emptyWeight: "",
    dateOfUnloading: "",
    amount: "",
    shortage: "",
    tds: "",
    extraDayCharges: "",
    netAmount: "",
    driverContact: "",
    companyContact: "",
  });

  const role = sessionStorage.getItem("role");
  const isAdmin = role === "admin";

  const fetchRecords = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/transport/transport-records"
    );
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRecord) {
        await axios.put(
          `http://localhost:5000/api/transport/transport-record/${editRecord._id}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/transport/transport-record",
          formData
        );
      }
      setShowModal(false);
      setEditRecord(null);
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setFormData(record);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await axios.delete(
        `http://localhost:5000/api/transport/transport-record/${id}`
      );
      fetchRecords();
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Transport Records</h2>
      {isAdmin && (
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded mb-4"
          onClick={() => {
            setEditRecord(null);
            setFormData({
              serialNumber: "",
              dateOfLoading: "",
              advancePayment: "",
              station: "",
              loadedWeight: "",
              emptyWeight: "",
              dateOfUnloading: "",
              amount: "",
              shortage: "",
              tds: "",
              extraDayCharges: "",
              netAmount: "",
              driverContact: "",
              companyContact: "",
            });
            setShowModal(true);
          }}
        >
          <HiPlus /> Add Record
        </button>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Sr. No.</th>
              <th className="text-left px-4 py-2 border-b">Date of Loading</th>
              <th className="text-left px-4 py-2 border-b">Advance</th>
              <th className="text-left px-4 py-2 border-b">Station</th>
              <th className="text-left px-4 py-2 border-b">Loaded Wt</th>
              <th className="text-left px-4 py-2 border-b">Empty Wt</th>
              <th className="text-left px-4 py-2 border-b">
                Date of Unloading
              </th>
              <th className="text-left px-4 py-2 border-b">Amount</th>
              <th className="text-left px-4 py-2 border-b">Shortage</th>
              <th className="text-left px-4 py-2 border-b">TDS</th>
              <th className="text-left px-4 py-2 border-b">Extra Charges</th>
              <th className="text-left px-4 py-2 border-b">Net Amount</th>
              <th className="text-left px-4 py-2 border-b">Driver Contact</th>
              <th className="text-left px-4 py-2 border-b">Company Contact</th>
              {isAdmin && (
                <th className="text-left px-4 py-2 border-b">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{r.serialNumber}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(r.dateOfLoading).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">{r.advancePayment}</td>
                <td className="px-4 py-2 border-b">{r.station}</td>
                <td className="px-4 py-2 border-b">{r.loadedWeight}</td>
                <td className="px-4 py-2 border-b">{r.emptyWeight}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(r.dateOfUnloading).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">{r.amount}</td>
                <td className="px-4 py-2 border-b">{r.shortage}</td>
                <td className="px-4 py-2 border-b">{r.tds}</td>
                <td className="px-4 py-2 border-b">{r.extraDayCharges}</td>
                <td className="px-4 py-2 border-b">{r.netAmount}</td>
                <td className="px-4 py-2 border-b">{r.driverContact}</td>
                <td className="px-4 py-2 border-b">{r.companyContact}</td>
                {isAdmin && (
                  <td className="px-4 py-2 border-b flex gap-2">
                    <button
                      onClick={() => handleEdit(r)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <HiPencil /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                      <HiTrash /> Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">
              {editRecord ? "Edit" : "Add"} Transport Record
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.keys(formData).map((key) => (
                  <div className="mb-3" key={key}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {key}
                    </label>
                    <input
                      type={key.includes("date") ? "date" : "text"}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {editRecord ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded ml-2"
                  onClick={() => {
                    setShowModal(false);
                    setEditRecord(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportRecord;
