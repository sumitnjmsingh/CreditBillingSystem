import { useState } from "react";
import axios from "../../api/axios";
import Loader from "../../components/Loader";

import {
  FaUserEdit,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaIdCard,
  FaCalendarAlt,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";

const UpdateProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    userName: user.userName || "",

    phoneNumber: user.phoneNumber || "",

    address: user.address || "",

    occupation: user.occupation || "",

    annualSalary: user.annualSalary || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      setMessage("");

      const response = await axios.put("/profile/update", formData);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage("Profile Updated Successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Updating Profile..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 flex items-center gap-3">
          <FaUserEdit className="text-blue-600" />
          My Profile
        </h1>

        {message && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col items-center">
              <img
                src={`https://ui-avatars.com/api/?background=2563eb&color=fff&size=256&name=${encodeURIComponent(
                  user.userName || "User",
                )}`}
                alt="Profile"
                className="w-32 h-32 rounded-full shadow-lg"
              />

              <h2 className="text-3xl font-bold mt-5">{user.userName}</h2>

              <p className="text-gray-500 mt-2">{user.userEmail}</p>
            </div>

            {/* Credit Score */}

            <div className="mt-8 bg-green-100 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold">Credit Score</h3>

              <h1 className="text-5xl font-bold text-green-700 mt-3">
                {user.creditScore || "-"}
              </h1>
            </div>

            {/* Personal Details */}

            <div className="mt-8 space-y-5">
              <ProfileRow
                icon={<FaUser />}
                title="Full Name"
                value={user.userName}
              />

              <ProfileRow
                icon={<FaEnvelope />}
                title="Email"
                value={user.userEmail}
              />

              <ProfileRow
                icon={<FaPhone />}
                title="Phone"
                value={user.phoneNumber}
              />

              <ProfileRow
                icon={<FaCalendarAlt />}
                title="Date of Birth"
                value={new Date(user.dateOfBirth).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}
              />

              <ProfileRow
                icon={<FaIdCard />}
                title="PAN Number"
                value={user.panNumber}
              />

              <ProfileRow
                icon={<FaShieldAlt />}
                title="Aadhaar Number"
                value={user.aadhaarNumber}
              />

              <ProfileRow
                icon={<FaMapMarkerAlt />}
                title="Address"
                value={user.address}
              />

              <ProfileRow
                icon={<FaBriefcase />}
                title="Occupation"
                value={user.occupation}
              />

              <ProfileRow
                icon={<FaMoneyBillWave />}
                title="Annual Salary"
                value={`₹ ${user.annualSalary || 0}`}
              />

              <ProfileRow
                icon={<FaCreditCard />}
                title="Account Status"
                value="ACTIVE"
              />
            </div>
          </div>
          {/* ==========================================
                    UPDATE PROFILE
          =========================================== */}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-8">Update Profile</h2>

            <form onSubmit={updateProfile} className="space-y-6">
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
                    className="
                      w-full
                      border
                      rounded-lg
                      py-3
                      pl-12
                      pr-4
                      focus:ring-2
                      focus:ring-blue-600
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* Phone */}

              <div>
                <label className="font-semibold">Phone Number</label>

                <div className="relative mt-2">
                  <FaPhone className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      rounded-lg
                      py-3
                      pl-12
                      pr-4
                      focus:ring-2
                      focus:ring-blue-600
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* Occupation */}

              <div>
                <label className="font-semibold">Occupation</label>

                <div className="relative mt-2">
                  <FaBriefcase className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      rounded-lg
                      py-3
                      pl-12
                      pr-4
                      focus:ring-2
                      focus:ring-blue-600
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* Salary */}

              <div>
                <label className="font-semibold">Annual Salary</label>

                <div className="relative mt-2">
                  <FaMoneyBillWave className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="number"
                    name="annualSalary"
                    value={formData.annualSalary}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      rounded-lg
                      py-3
                      pl-12
                      pr-4
                      focus:ring-2
                      focus:ring-blue-600
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* Address */}

              <div>
                <label className="font-semibold">Address</label>

                <div className="relative mt-2">
                  <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />

                  <textarea
                    rows="4"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      rounded-lg
                      py-3
                      pl-12
                      pr-4
                      focus:ring-2
                      focus:ring-blue-600
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* Read Only Information */}

              <div className="bg-slate-100 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Account Information</h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Email</span>

                    <p className="font-semibold">{user.userEmail}</p>
                  </div>

                  <div>
                    <span className="text-gray-500">Credit Score</span>

                    <p className="font-semibold text-green-700">
                      {user.creditScore}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-500">PAN</span>

                    <p className="font-semibold">{user.panNumber}</p>
                  </div>

                  <div>
                    <span className="text-gray-500">Aadhaar</span>

                    <p className="font-semibold">{user.aadhaarNumber}</p>
                  </div>

                  <div>
                    <span className="text-gray-500">Date of Birth</span>

                    <p className="font-semibold">{user.dateOfBirth}</p>
                  </div>

                  <div>
                    <span className="text-gray-500">Account Status</span>

                    <p className="font-semibold text-green-700">ACTIVE</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-4
                  rounded-xl
                  font-bold
                  text-lg
                  transition
                "
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({ icon, title, value }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
      <div className="flex items-center gap-3">
        <div className="text-blue-600 text-lg">{icon}</div>

        <span className="font-medium text-gray-700">{title}</span>
      </div>

      <span className="font-semibold text-slate-900 text-right">
        {value || "-"}
      </span>
    </div>
  );
};

export default UpdateProfile;
