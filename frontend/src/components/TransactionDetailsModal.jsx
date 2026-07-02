import { FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const TransactionDetailsModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-600 hover:text-red-600"
        >
          <FaTimes size={22} />
        </button>

        <h2 className="text-3xl font-bold mb-8">Transaction Details</h2>

        <div className="grid grid-cols-2 gap-6">
          <Info title="Transaction Id" value={transaction.transactionId} />

          <Info title="Reference Number" value={transaction.referenceNumber} />

          <Info title="Merchant" value={transaction.merchantName} />

          <Info title="Category" value={transaction.merchantCategory} />

          <Info title="Location" value={transaction.merchantLocation} />

          <Info title="Amount" value={`₹ ${transaction.amount}`} />

          <Info title="Currency" value={transaction.currency} />

          <Info title="Payment Mode" value={transaction.paymentMode} />

          <Info title="Transaction Date" value={new Date(transaction.transactionDate).toDateString()} />

          <Info title="Transaction Time" value={transaction.transactionTime} />

          <Info title="Created At" value={(transaction.createdAt)} />

          <div>
            <p className="text-gray-500">Status</p>

            {transaction.status === "SUCCESS" ? (
              <span className="flex items-center gap-2 text-green-600 font-semibold mt-2">
                <FaCheckCircle />
                SUCCESS
              </span>
            ) : (
              <span className="flex items-center gap-2 text-red-600 font-semibold mt-2">
                <FaTimesCircle />
                FAILED
              </span>
            )}
          </div>

          <div className="col-span-2">
            <p className="text-gray-500">Remarks</p>

            <p className="mt-2">{transaction.remarks || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ title, value }) => (
  <div>
    <p className="text-gray-500">{title}</p>

    <p className="font-semibold mt-1">{value || "-"}</p>
  </div>
);

export default TransactionDetailsModal;
