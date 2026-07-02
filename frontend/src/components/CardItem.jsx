import toast from "react-hot-toast";
import { FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CardItem = ({ card, onBlock }) => {
  const navigate = useNavigate();

  const formatCardNumber = (number) => {
    if (!number) return "**** **** **** ****";

    return number.replace(/\d(?=\d{4})/g, "*");
  };

  return (
    <div
      className="
                bg-gradient-to-r
                from-blue-700
                to-indigo-900
                rounded-2xl
                p-6
                text-white
                shadow-xl
                hover:scale-105
                transition
                duration-300
            "
    >
      {/* Card Type */}

      <div className="flex justify-between items-center">
        <FaCreditCard size={30} />

        <span className="font-bold text-lg">{card.cardType}</span>
      </div>

      {/* Card Number */}

      <h2 className="text-2xl tracking-widest mt-8">
        {/* {formatCardNumber(card.cardNumber)} */}
        {card.cardNumber}
      </h2>
      <h2 className="text-2xl tracking-widest mt-8">
        CVV : {card.encryptedCvv}
      </h2>

      {/* Card Holder */}

      <div className="mt-8">
        <p className="text-sm text-gray-300">CARD HOLDER</p>

        <h3 className="font-semibold text-lg">{card.cardHolderName}</h3>
      </div>

      {/* Expiry */}

      <div className="mt-4">
        <p className="text-sm text-gray-300">EXPIRY</p>

        <h3>{new Date(card.expiryDate).toLocaleDateString()}</h3>
      </div>

      {/* Limits */}

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div>
          <p className="text-xs">Credit Limit</p>

          <h4 className="font-bold">₹ {card.creditLimit}</h4>
        </div>

        <div>
          <p className="text-xs">Used</p>

          <h4 className="font-bold text-red-300">₹ {card.usedLimit}</h4>
        </div>

        <div>
          <p className="text-xs">Available</p>

          <h4 className="font-bold text-green-300">₹ {card.availableLimit}</h4>
        </div>
      </div>

      {/* Status */}

      <div className="mt-6">
        <span
          className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        ${card.blocked ? "bg-red-500" : "bg-green-600"}
                    `}
        >
          {card.blocked ? "Blocked" : "Active"}
        </span>
      </div>

      {/* Buttons */}

      <div className="flex gap-3 mt-8">
        {/* <button
          onClick={() => toast.success("Feature available soon!!!")}
          className="
                        flex-1
                        bg-white
                        text-blue-700
                        py-2
                        rounded-lg
                        hover:bg-gray-200
                    "
        >
          View Details
        </button> */}

        <button
          onClick={() => onBlock(card.cardId, !card.blocked)}
          className="
                        flex-1
                        bg-red-500
                        hover:bg-red-600
                        py-2
                        rounded-lg
                    "
        >
          {card.blocked ? "Unblock" : "Block"}
        </button>
      </div>
    </div>
  );
};

export default CardItem;
