import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import Loader from "../../components/Loader";
import { login } from "../../api/userApi";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    userEmail: "",

    userPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await login(formData);

      localStorage.setItem("token", response.token);

      localStorage.setItem("user", JSON.stringify(response.user));

      localStorage.setItem("cardIds", JSON.stringify(response.cardIds));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Signing In..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-slate-900 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-700">
          Credit Billing
        </h1>

        <p className="text-center text-gray-500 mt-2">Sign in to continue</p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email */}

          <div>
            <label className="font-semibold">Email</label>

            <div className="relative mt-2">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="userEmail"
                placeholder="Enter Email"
                value={formData.userEmail}
                onChange={handleChange}
                required
                className="w-full border rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="font-semibold">Password</label>

            <div className="relative mt-2">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="userPassword"
                placeholder="Enter Password"
                value={formData.userPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-lg py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-600 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-3
                            rounded-lg
                            font-semibold
                            transition
                        "
          >
            Login
          </button>
        </form>

        <div className="text-center mt-8">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 ml-2 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
