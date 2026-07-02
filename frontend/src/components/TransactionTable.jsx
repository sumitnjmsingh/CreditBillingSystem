import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TransactionDetailsModal from "./TransactionDetailsModal";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

const TransactionTable = ({ transactions = [] }) => {
  const navigate = useNavigate();

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-500">
          No Transactions Found
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Merchant</th>

              <th className="px-6 py-4 text-left">Category</th>

              <th className="px-6 py-4 text-left">Amount</th>

              <th className="px-6 py-4 text-left">Date</th>

              <th className="px-6 py-4 text-left">Payment</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.transactionId}
                className="border-b hover:bg-slate-100 transition"
              >
                <td className="px-6 py-4 font-semibold">
                  {transaction.merchantName}
                </td>

                <td className="px-6 py-4">{transaction.merchantCategory}</td>

                <td className="px-6 py-4 font-bold text-blue-600">
                  ₹ {transaction.amount}
                </td>

                <td className="px-6 py-4">
                  {/* {transaction.transactionDate} */}
                  {new Date(transaction.transactionDate).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </td>

                <td className="px-6 py-4">{transaction.paymentMode}</td>

                <td className="px-6 py-4">
                  {transaction.status === "SUCCESS" ? (
                    <span className="flex items-center gap-2 text-green-600 font-semibold">
                      <FaCheckCircle />
                      SUCCESS
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-red-600 font-semibold">
                      <FaTimesCircle />
                      FAILED
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setSelectedTransaction(transaction)}
                    className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    flex
                    items-center
                    gap-2
                    mx-auto
                    "
                  >
                    <FaEye />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TransactionDetailsModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
