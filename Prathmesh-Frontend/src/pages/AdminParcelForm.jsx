import React, { useState } from "react";
import axios from "axios";

const AdminParcelForm = () => {
  const [form, setForm] = useState({
    companyId: "",
    location: "",
    deliveryDays: "",
    actualAmount: "",
    totalAmount: "",
    vanAvailable: false,
    delayCharges: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://prathmesh-imp.vercel.app/api/parcels/create",
        form
      );
      alert("Parcel created successfully.");
    } catch (err) {
      alert("Error creating parcel.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        name="companyId"
        placeholder="Company ID"
        onChange={handleChange}
      />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input
        name="deliveryDays"
        type="number"
        placeholder="Delivery Days"
        onChange={handleChange}
      />
      <input
        name="actualAmount"
        type="number"
        placeholder="Actual Amount"
        onChange={handleChange}
      />
      <input
        name="totalAmount"
        type="number"
        placeholder="Total Amount"
        onChange={handleChange}
      />
      <input
        name="delayCharges"
        type="number"
        placeholder="Delay Charges"
        onChange={handleChange}
      />
      <label>
        <input type="checkbox" name="vanAvailable" onChange={handleChange} />{" "}
        Van Available
      </label>
      <button type="submit">Create Parcel</button>
    </form>
  );
};

export default AdminParcelForm;
