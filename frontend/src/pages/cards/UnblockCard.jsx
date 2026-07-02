import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Loader from "../../components/Loader";
import { FaUnlock } from "react-icons/fa";
import toast from "react-hot-toast";

const UnblockCard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlockedCards();
  }, []);

  const fetchBlockedCards = async () => {
    try {
      const response = await axios.get("/cards");

      // Show only blocked cards
      setCards(response.data.filter((card) => card.blocked));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const unblockCard = async (cardId) => {
    const confirmUnblock = window.confirm(
      "Are you sure you want to unblock this card?",
    );

    if (!confirmUnblock) return;

    try {
      await axios.put(`/card/${cardId}/unblock`);

      toast.success("Card Unblocked Successfully");

      fetchBlockedCards();
    } catch (error) {
      toast.error("Unable to unblock card.");
    }
  };

  if (loading) {
    return <Loader message="Loading Blocked Cards..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Unblock Credit Card</h1>

      {cards.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-xl text-gray-600">No Blocked Cards Found</h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.cardId}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold">{card.cardHolderName}</h2>

              <p className="mt-2 text-gray-500">
                **** **** **** {card.cardNumber.slice(-4)}
              </p>

              <p className="mt-3">
                Card Type :<strong> {card.cardType}</strong>
              </p>

              <p>
                Credit Limit :<strong> ₹{card.creditLimit}</strong>
              </p>

              <p>
                Available :
                <strong className="text-green-600">
                  ₹{card.availableLimit}
                </strong>
              </p>

              <button
                onClick={() => unblockCard(card.cardId)}
                className="
                  mt-6
                  w-full
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  py-3
                  rounded-lg
                  flex
                  justify-center
                  items-center
                  gap-2
                "
              >
                <FaUnlock />
                Unblock Card
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnblockCard;
