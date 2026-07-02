import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaSearch,
  FaCreditCard,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cardIds");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
            <FaCreditCard className="text-white text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-wide">
              Credit Billing
            </h1>

            <p className="text-xs text-gray-500 tracking-wider uppercase">
              Smart Card Management
            </p>
          </div>
        </div>

        {/* </div> */}

        {/* Right */}

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaUserCircle size={34} className="text-blue-700" />

            <div>
              <p className="font-semibold">{user?.userName || "Guest"}</p>

              <p className="text-xs text-gray-500">{user?.userEmail}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="
              flex
              items-center
              gap-2
              bg-red-500
              hover:bg-red-600
              text-white
              px-4
              py-2
              rounded-lg
              transition
            "
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
