import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const getSubdomain = () => {
  const host = window.location.hostname;
  const parts = host.split(".");
  if (parts.length > 2) {
    return parts[0]; // e.g., admin.example.com → "admin"
  }
  return null;
};

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    role: "", // no default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sub = getSubdomain();
    const validRoles = ["admin", "owner", "driver", "company"];
    if (sub && validRoles.includes(sub)) {
      setForm((prev) => ({ ...prev, role: sub }));
    }
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.role) {
      toast.error("Role is required.");
      return;
    }

    try {
      await axios.post(
        "https://prathmesh-imp.vercel.app/api/auth/signup",
        form
      );
      toast.success("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  const isRoleFromSubdomain = ["admin", "owner", "driver", "company"].includes(
    form.role
  );

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4 capitalize">
          Signup {form.role ? `as ${form.role}` : ""}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
          required
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 border pr-10"
            required
          />
          <span
            className="absolute right-2 top-2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {!isRoleFromSubdomain && (
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full mb-4 p-2 border"
            required
          >
            <option value="">Select Role</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
            <option value="driver">Driver</option>
            <option value="company">Company</option>
          </select>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Signup
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
