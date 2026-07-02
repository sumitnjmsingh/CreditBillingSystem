import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { changePassword } from "../../api/userApi";
import Loader from "../../components/Loader";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New Password and Confirm Password do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      setMessage(response.message || "Password changed successfully.");

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to change password.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Changing Password..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <FaLock className="text-blue-600" size={28} />
          <h1 className="text-3xl font-bold">Change Password</h1>
        </div>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-5">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold">Current Password</label>

            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold">New Password</label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold">Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
