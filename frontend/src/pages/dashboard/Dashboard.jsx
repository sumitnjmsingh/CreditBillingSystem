import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

import Loader from "../../components/Loader";
import CardItem from "../../components/CardItem";
import BillingCard from "../../components/BillingCard";
import RewardCard from "../../components/RewardCard";
import TransactionTable from "../../components/TransactionTable";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reward, setReward] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

    const handleBlock = async (cardId, isBlock) => {
    try {
      if (isBlock) {
        await axios.put(`/card/${cardId}/block`);

        setCards((previousCards) =>
          previousCards.map((card) =>
            card.cardId === cardId ? { ...card, blocked: true } : card,
          ),
        );
      } else {
        await axios.put(`/card/${cardId}/unblock`);

        setCards((previousCards) =>
          previousCards.map((card) =>
            card.cardId === cardId ? { ...card, blocked: false } : card,
          ),
        );
      }
    } catch (err) {
      toast.error("Unable to block card.");
    }
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const cardsResponse = await axios.get("/cards");
      setCards(cardsResponse.data);

      if (cardsResponse.data.length > 0) {
        const firstCard = cardsResponse.data[0];

        const cardId = firstCard.cardId;

        const transactionResponse = await axios.get(
          `/card/${cardId}/transactions`,
        );

        setTransactions(transactionResponse.data);

        const rewardResponse = await axios.get(`/card/${cardId}/rewardBalance`);

        setReward(rewardResponse.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Loading Dashboard..." />;
  }

  const totalLimit = cards.reduce((sum, card) => sum + card.creditLimit, 0);

  const usedLimit = cards.reduce((sum, card) => sum + card.usedLimit, 0);

  const availableLimit = cards.reduce(
    (sum, card) => sum + card.availableLimit,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <p className="text-gray-500 mt-2">
            Welcome to your Credit Billing Dashboard
          </p>
        </div>

        <Link
          to="/card/create"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          + Create Card
        </Link>
      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <SummaryCard title="Cards" value={cards.length} color="blue" />

        <SummaryCard
          title="Credit Limit"
          value={`₹${totalLimit}`}
          color="green"
        />

        <SummaryCard title="Used Limit" value={`₹${usedLimit}`} color="red" />

        <SummaryCard
          title="Available"
          value={`₹${availableLimit}`}
          color="yellow"
        />
      </div>

      {/* Cards */}

      <h2 className="text-2xl font-bold mb-6">My Cards</h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {cards.map((card) => (
          <CardItem key={card.cardId} card={card} onBlock={handleBlock} />
        ))}
      </div>

      {/* Reward */}

      {reward && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Rewards</h2>

          <RewardCard reward={reward} onRedeem={() => {toast.success("Feature available soon")}} />
        </div>
      )}

      {/* Transactions */}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>

        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, color }) => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div className={`${colors[color]} text-white rounded-xl p-6 shadow-lg`}>
      <h2 className="text-lg">{title}</h2>

      <h1 className="text-3xl font-bold mt-4">{value}</h1>
    </div>
  );
};

export default Dashboard;
