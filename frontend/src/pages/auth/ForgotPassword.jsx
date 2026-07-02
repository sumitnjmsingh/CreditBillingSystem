import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import Loader from "../../components/Loader";
import { forgotPassword } from "../../api/userApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email);

      setMessage(response.message || "Password reset link sent successfully.");

      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to process your request.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Sending Reset Link..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-6">
          <FaEnvelope size={40} className="text-blue-600" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Forgot Password</h1>

        <p className="text-gray-500 text-center mb-8">
          Enter your registered email address.
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold">Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                mt-2
                border
                rounded-lg
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <button
            type="submit"
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
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
