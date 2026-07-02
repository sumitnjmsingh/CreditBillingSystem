import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaHome,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaHistory,
  FaGift,
  FaUser,
  FaPlusCircle,
  FaSignOutAlt,
  FaRobot,
  FaBars,
  FaChevronLeft,
} from "react-icons/fa";
import { TbCreditCardPay } from "react-icons/tb";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cardIds");
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center py-3 rounded-lg transition-all duration-300
    ${sidebarOpen ? "gap-3 px-5 justify-start" : "justify-center px-0"}
    ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-blue-700 hover:text-white"
    }`;

  return (
    <aside
      className={`
        h-screen
        bg-slate-900
        text-white
        shrink-0
        sticky
        top-0
        shadow-xl
        overflow-y-auto
        transition-all
        duration-300
        ${sidebarOpen ? "w-72" : "w-20"}
      `}
    >
      {/* Header */}

      <div className="border-b border-slate-700 p-4 flex items-center justify-center">

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-xl hover:text-blue-400 transition"
        >
          {sidebarOpen ? <FaChevronLeft /> : <FaBars />}
        </button>
      </div>

      <div className="p-3">
        {sidebarOpen && (
          <p className="text-gray-400 text-sm uppercase mb-3">Dashboard</p>
        )}

        <NavLink to="/dashboard" className={menuClass}>
          <FaHome size={20} />
          {sidebarOpen && <span>Dashboard</span>}
        </NavLink>

        {sidebarOpen && (
          <p className="text-gray-400 text-sm uppercase mt-8 mb-3">Cards</p>
        )}

        <NavLink to="/cards" className={menuClass}>
          <FaCreditCard size={20} />
          {sidebarOpen && <span>All Cards</span>}
        </NavLink>

        <NavLink to="/card/create" className={menuClass}>
          <FaPlusCircle size={20} />
          {sidebarOpen && <span>Create Card</span>}
        </NavLink>

        <NavLink to="/statement" className={menuClass}>
          <FaFileInvoiceDollar size={20} />
          {sidebarOpen && <span>Billing Statement</span>}
        </NavLink>

        <NavLink to="/cards/reward-balance" className={menuClass}>
          <FaGift size={20} />
          {sidebarOpen && <span>Reward Balance</span>}
        </NavLink>

        <NavLink to="/availableLimit" className={menuClass}>
          <TbCreditCardPay size={20} />
          {sidebarOpen && <span>Available Limit</span>}
        </NavLink>

        {sidebarOpen && (
          <p className="text-gray-400 text-sm uppercase mt-8 mb-3">
            Transactions
          </p>
        )}

        <NavLink to="/transactions" className={menuClass}>
          <FaHistory size={20} />
          {sidebarOpen && <span>Transactions</span>}
        </NavLink>

        <NavLink to="/merchant" className={menuClass}>
          <FaPlusCircle size={20} />
          {sidebarOpen && <span>MerchantSelection</span>}
        </NavLink>

        {sidebarOpen && (
          <p className="text-gray-400 text-sm uppercase mt-8 mb-3">Payment</p>
        )}

        <NavLink to="/aiAnalysis" className={menuClass}>
          <FaRobot size={20} />
          {sidebarOpen && <span>AI Log Analyzer</span>}
        </NavLink>

        <NavLink to="/payment" className={menuClass}>
          <FaMoneyBillWave size={20} />
          {sidebarOpen && <span>Payment</span>}
        </NavLink>

        {sidebarOpen && (
          <p className="text-gray-400 text-sm uppercase mt-8 mb-3">User</p>
        )}

        <NavLink to="/profile" className={menuClass}>
          <FaUser size={20} />
          {sidebarOpen && <span>Profile</span>}
        </NavLink>

        <button
          onClick={logout}
          className={`
            w-full
            mt-10
            flex
            items-center
            py-3
            rounded-lg
            bg-red-600
            hover:bg-red-700
            transition-all
            duration-300
            ${sidebarOpen ? "justify-start gap-3 px-5" : "justify-center"}
          `}
        >
          <FaSignOutAlt size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
