import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const BillingCard = ({ billing }) => {
  if (!billing) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-500">
          No Billing Information Available
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">
        <FaMoneyBillWave size={28} className="text-blue-600" />

        <h2 className="text-2xl font-bold text-gray-800">
          Monthly Billing Statement
        </h2>
      </div>

      {/* Billing Details */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InfoItem
          title="Previous Balance"
          value={`₹ ${billing.previousBalance}`}
        />

        <InfoItem
          title="Current Balance"
          value={`₹ ${billing.currentBalance}`}
        />

        <InfoItem
          title="Outstanding Balance"
          value={`₹ ${billing.outstandingBalance}`}
        />

        <InfoItem title="Minimum Due" value={`₹ ${billing.minimumDue}`} />

        <InfoItem title="Interest" value={`₹ ${billing.interest}`} />

        <InfoItem title="Late Fee" value={`₹ ${billing.lateFee}`} />

        <InfoItem title="GST" value={`₹ ${billing.gst}`} />

        <InfoItem
          title="Available Credit"
          value={`₹ ${billing.availableCredit}`}
        />
      </div>

      {/* Dates */}

      <div className="mt-8 border-t pt-6">
        <div className="flex items-center gap-2 text-gray-700 mb-3">
          <FaCalendarAlt />

          <span>
            Billing Date :
            <strong className="ml-2">
              {new Date(billing.billingDate).toLocaleDateString()}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <FaCalendarAlt />

          <span>
            Due Date :
            <strong className="ml-2">
              {new Date(billing.dueDate).toLocaleDateString()}
            </strong>
          </span>
        </div>
      </div>

      {/* Payment Status */}

      <div className="mt-8">
        {billing.paid ? (
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <FaCheckCircle />
            Payment Completed
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600 font-semibold">
            <FaTimesCircle />
            Payment Pending
          </div>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ title, value }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <p className="text-sm text-gray-500">{title}</p>

    <h3 className="text-xl font-bold text-blue-700 mt-2">{value}</h3>
  </div>
);

export default BillingCard;
