import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loader from "../../components/Loader";
import RewardCard from "../../components/RewardCard";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const RewardBalance = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

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

  const fetchRewardBalance = async () => {
    if (!selectedCard) {
      toast.error("Please select CardNumber");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/card/${selectedCard}/rewardBalance`);

      setReward(response.data);
    } catch (err) {
      setError(err.response?.data || "Unable to fetch reward balance.");
      setReward(null);
    } finally {
      setLoading(false);
    }
  };

  const redeemRewards = () => {
    toast.success("Reward redemption feature coming soon.");
  };

  if (loading) {
    return <Loader message="Fetching Reward Balance..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Reward Balance</h1>

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
            onClick={fetchRewardBalance}
            className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                rounded-lg
            "
          >
            Check Rewards
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {reward && <RewardCard reward={reward} onRedeem={redeemRewards} />}
    </div>
  );
};

export default RewardBalance;
