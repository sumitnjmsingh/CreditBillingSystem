import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import Loader from "../../components/Loader";
import { signup } from "../../api/userApi";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
    dateOfBirth: "",
    panNumber: "",
    aadhaarNumber: "",
    phoneNumber: "",
    address: "",
    occupation: "",
    annualSalary: "",
    creditScore: "",
  });

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

    if (formData.userPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await signup({
        userName: formData.userName,
        userEmail: formData.userEmail,
        userPassword: formData.userPassword,
        dateOfBirth: formData.dateOfBirth,
        panNumber: formData.panNumber,
        aadhaarNumber: formData.aadhaarNumber,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        occupation: formData.occupation,
        annualSalary: Number(formData.annualSalary),
        creditScore: Number(formData.creditScore),
      });

      setMessage(response.message || "Account Created Successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Creating Account..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-slate-900 flex justify-center items-center px-4 py-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-5">
        <h1 className="text-4xl font-bold text-center text-blue-700">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Register for Credit Billing System
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

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}

            <div>
              <label className="font-semibold">Full Name</label>

              <div className="relative mt-2">
                <FaUser className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  placeholder="Enter Full Name"
                  className="w-full border rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="font-semibold">Email</label>

              <div className="relative mt-2">
                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  required
                  placeholder="Enter Email"
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
                  value={formData.userPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter Password"
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
                  placeholder="Confirm Password"
                  className="w-full border rounded-lg py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-600 outline-none"
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

            <div>
              <label className="font-semibold">Date of Birth</label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
            Professional Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">PAN Number</label>

              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                placeholder="ABCDE1234F"
                required
                className="w-full mt-2 border rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold">Aadhaar Number</label>

              <input
                type="text"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                placeholder="123456789012"
                required
                className="w-full mt-2 border rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold">Phone Number</label>

              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="9876543210"
                required
                className="w-full mt-2 border rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold">Address</label>

              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold">Occupation</label>

              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold">Annual Salary</label>

              <input
                type="number"
                name="annualSalary"
                value={formData.annualSalary}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold">Credit Score</label>

              <input
                type="number"
                name="creditScore"
                value={formData.creditScore}
                onChange={handleChange}
                placeholder="750"
                className="w-full mt-2 border rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-8">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-2 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
