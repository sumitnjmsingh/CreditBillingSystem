import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import Loader from "../../components/Loader";
import { resetPassword } from "../../api/userApi";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    newPassword: "",

    confirmPassword: "",
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

    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");

      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword({
        token,

        newPassword: formData.newPassword,
      });

      setMessage(response.message || "Password Reset Successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Resetting Password..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-slate-900 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter your new password.
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mt-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {/* New Password */}

          <div>
            <label className="font-semibold">New Password</label>

            <div className="relative mt-2">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-lg py-3 pl-12 pr-12"
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

          {/* Confirm Password */}

          <div>
            <label className="font-semibold">Confirm Password</label>

            <div className="relative mt-2">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-lg py-3 pl-12 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-4"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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
            "
          >
            Reset Password
          </button>
        </form>

        <div className="text-center mt-8">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
