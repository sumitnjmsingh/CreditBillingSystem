import { useState } from "react";
import axios from "../../api/axios";
import Loader from "../../components/Loader";
import { FaMoneyCheckAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");

  const [amount, setAmount] = useState("");

  const [method, setMethod] = useState("UPI");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const payBill = async (e) => {
    e.preventDefault();

    if (!cardNumber || !amount) {
      toast.error("Please fill all fields.");

      return;
    }

    try {
      setLoading(true);

      setError("");

      setMessage("");

      const response = await axios.post(`/payment/${cardNumber}/payBill`, {
        amount,
        paymentMethod: method,
      });

      setMessage(response.data.message || "Payment Successful");

      setAmount("");
    } catch (err) {
      setError(err.response?.data?.message || "Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Processing Payment..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <FaMoneyCheckAlt size={30} className="text-blue-600" />

          <h1 className="text-3xl font-bold">Pay Credit Card Bill</h1>
        </div>

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

        <form onSubmit={payBill} className="space-y-6">
          <div>
            <label className="font-semibold">CardNumber</label>

            <input
              type="String"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full mt-2 border rounded-lg px-4 py-3"
              placeholder="Enter CardNumber"
            />
          </div>

          <div>
            <label className="font-semibold">Payment Amount</label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-2 border rounded-lg px-4 py-3"
              placeholder="Enter Amount"
            />
          </div>

          <div>
            <label className="font-semibold">Payment Method</label>

            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full mt-2 border rounded-lg px-4 py-3"
            >
              <option>UPI</option>

              <option>Net Banking</option>

              <option>Debit Card</option>

              <option>Wallet</option>
            </select>
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
            Pay Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
