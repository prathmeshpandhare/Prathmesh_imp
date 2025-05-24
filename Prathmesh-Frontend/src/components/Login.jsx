import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import solarImage from "../../src/Images/distributor8.png"; // Import the image file

const SolarLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = { username: "", password: "", general: "" };
    let isValid = true;

    if (!formData.username) {
      tempErrors.username = "Username is required.";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Commented out server integration for UI testing
        // const response = await axios.post(
        //   "https://7hmgmjzr-3000.inc1.devtunnels.ms/Dadmin/login",
        //   formData
        // );

        // const { token, distributorAdmin } = response.data.data;
        // if (token) {
        //   sessionStorage.setItem("authToken", token);
        //   sessionStorage.setItem("firmId", distributorAdmin.id);
        //   toast.success("Login successful!");

        //   window.dispatchEvent(new Event("storage"));
        //   navigate("/");
        // } else {
        //   toast.error("Login failed. Please try again.");
        // }

        // Simulate success for UI testing
        const mockToken = "mocked_token_123";
        const mockDistributorAdminId = "mocked_admin_id_456";

        sessionStorage.setItem("authToken", mockToken);
        sessionStorage.setItem("firmId", mockDistributorAdminId);
        toast.success("Login successful! (mocked)");

        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || "Login failed. Please try again.";
        setErrors({ ...errors, general: errorMsg });
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center repeating-bg">
      <ToastContainer />
      <div className="flex w-full max-w-6xl bg-[#2D1E56] rounded-2xl shadow-xl overflow-hidden">
        <div className="w-1/2 hidden md:flex items-center justify-center p-0">
          <img
            src={solarImage}
            alt="Solar Panel"
            className="object-fill w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white p-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Distributor Login
          </h2>
          <p className="text-gray-600 mb-6">
            Please enter your username and password
          </p>

          {errors.general && (
            <div className="mb-4 text-red-600 text-center bg-red-100 p-2 rounded">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <div className="text-right text-sm mt-1">
                <Link to="/forgot" className="text-purple-500 hover:underline">
                  Forget Password
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 text-white font-medium py-3 rounded-lg hover:bg-purple-600 transition"
            >
              Login...
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-500 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolarLogin;
