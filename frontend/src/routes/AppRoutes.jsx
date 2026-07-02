import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/auth/ChangePassword";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Profile
import UpdateProfile from "../pages/profile/UpdateProfile";

// Cards
import AllCards from "../pages/cards/AllCards";
import CreateCard from "../pages/cards/CreateCard";
import CardDetails from "../pages/cards/CardDetails";
import AvailableLimit from "../pages/cards/AvailableLimit";
import Statement from "../pages/cards/Statement";
import RewardBalance from "../pages/cards/RewardBalance";
import BlockCard from "../pages/cards/BlockCard";
import UnblockCard from "../pages/cards/UnblockCard";

// Transactions
import Transactions from "../pages/transactions/Transactions";
import MerchantSelection from "../pages/transactions/MerchantSelection";
import MerchantCheckout from "../pages/transactions/MerchantCheckout";

// Payment
import Payment from "../pages/payment/Payment";
import AIAnalyzer from "../components/AIAnalyzer";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/aiAnalysis" element={<AIAnalyzer />} />

          {/* Profile */}

          <Route path="/profile" element={<UpdateProfile />} />

          {/* Cards */}

          <Route path="/cards" element={<AllCards />} />

          <Route path="/card/create" element={<CreateCard />} />

          <Route path="/cards/:cardId" element={<CardDetails />} />

          <Route path="/statement" element={<Statement />} />

          <Route path="/cards/reward-balance" element={<RewardBalance />} />

          <Route path="/availableLimit" element={<AvailableLimit />} />

          {/* Transactions */}

          <Route path="/transactions" element={<Transactions />} />

          <Route path="/merchant" element={<MerchantSelection />} />

          <Route path="/merchant/:merchant" element={<MerchantCheckout />} />

          {/* Payment */}

          <Route path="/payment" element={<Payment />} />
        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={
            <h1 className="text-center text-4xl mt-20">404 - Page Not Found</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
