import { useEffect, useState } from "react";
import axios from "../../api/axios";
import CardItem from "../../components/CardItem";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const AllCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/cards");

      setCards(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch cards.");
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return <Loader message="Loading Cards..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Credit Cards</h1>

        <button
          onClick={fetchCards}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {!error && cards.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-500">
            No Cards Available
          </h2>

          <p className="mt-2 text-gray-400">Create your first credit card.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {cards.map((card) => (
          <CardItem key={card.cardId} card={card} onBlock={handleBlock} />
        ))}
      </div>
    </div>
  );
};

export default AllCards;
