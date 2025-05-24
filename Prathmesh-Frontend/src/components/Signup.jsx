import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const SuperAdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    mobile: "",
    address: "",
    info: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.info.trim()) newErrors.info = "Info is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const response = await axios.post(
        "https://7hmgmjzr-3000.inc1.devtunnels.ms/admin/signup-super-admin",
        { ...formData, role_id: 1 }
      );

      toast.success("Signup successful! Welcome Solar Cleaning Systems!");

      setFormData({
        name: "",
        username: "",
        password: "",
        email: "",
        mobile: "",
        address: "",
        info: "",
      });

      navigate("/login");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Signup failed. Please try again.";
      setErrors({ general: errorMsg });
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Super Admin Signup
        </h2>

        {errors.general && (
          <div className="mb-4 text-red-600 text-center bg-red-100 p-2 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />

          <PasswordInputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            error={errors.mobile}
          />

          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />

          <InputField
            label="Info"
            name="info"
            value={formData.info}
            onChange={handleChange}
            error={errors.info}
          />

          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 transition duration-300 mt-4"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

// Reusable InputField Component
const InputField = ({ label, name, value, onChange, type = "text", error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1 font-medium text-sm">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm`}
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);

// Password InputField Component with Toggle
const PasswordInputField = ({ label, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 mb-1 font-medium text-sm">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm`}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      <button
        type="button"
        className="absolute right-3 top-9 text-gray-600"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SuperAdminSignup;
