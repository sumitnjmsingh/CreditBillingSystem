import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loader from "../../components/Loader";
import { FaWallet, FaCreditCard } from "react-icons/fa";
import toast from "react-hot-toast";

const AvailableLimit = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [limit, setLimit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get("/cards");

      setCards(response.data);

      if (response.data.length > 0) {
        setSelectedCard(response.data[0].cardId);
      }
    } catch (err) {
      toast.error("Unable to fetch cards.");
    }
  };

  const fetchLimit = async () => {
    if (!selectedCard) {
      toast.error("Please select CardNumber");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/card/${selectedCard}/availableLimit`);

      setLimit(response.data);
    } catch (err) {
      setError(err.response?.data || "Unable to fetch available limit.");
      setLimit(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Fetching Available Limit..." />;
  }

  const usedPercentage = limit
    ? (limit.usedLimit / limit.creditLimit) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Available Credit Limit</h1>

      {/* Search Card */}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedCard}
            onChange={(e) => setSelectedCard(e.target.value)}
            className="
                flex-1
                border
                rounded-lg
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-600
            "
          >
            <option value="">Select Credit Card</option>

            {cards.map((card) => (
              <option key={card.cardId} value={card.cardId}>
                **** **** **** {card.cardNumber.slice(-4)}
              </option>
            ))}
          </select>

          <button
            onClick={fetchLimit}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              rounded-lg
            "
          >
            Check Limit
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {limit && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <FaCreditCard className="text-blue-600" size={30} />

            <h2 className="text-2xl font-bold">Card {selectedCard}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-500">Credit Limit</p>

              <h2 className="text-3xl font-bold text-blue-700 mt-2">
                ₹{limit.creditLimit}
              </h2>
            </div>

            <div className="bg-red-50 p-6 rounded-xl">
              <p className="text-gray-500">Used Limit</p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                ₹{limit.usedLimit}
              </h2>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <p className="text-gray-500">Available Limit</p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                ₹{limit.availableLimit}
              </h2>
            </div>
          </div>

          {/* Progress */}

          <div className="mt-10">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Credit Utilization</span>

              <span>{usedPercentage.toFixed(1)}%</span>
            </div>

            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{
                  width: `${usedPercentage}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <FaWallet size={24} className="text-green-600" />

            <p className="text-lg">
              You can still spend
              <span className="font-bold text-green-700 ml-2">
                ₹{limit.availableLimit}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableLimit;
