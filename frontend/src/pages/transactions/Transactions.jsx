import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Loader from "../../components/Loader";
import SearchBar from "../../components/SearchBar";
import TransactionTable from "../../components/TransactionTable";
import toast from "react-hot-toast";

const Transactions = () => {
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState("");

  const [transactions, setTransactions] = useState([]);

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("ALL");

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

  const fetchTransactions = async () => {
    if (!selectedCard) {
      toast.error("Please select CardNumber");

      return;
    }

    try {
      setLoading(true);

      setError("");

      const response = await axios.get(`/card/${selectedCard}/transactions`);

      setTransactions(response.data);

      setFilteredTransactions(response.data);
    } catch (err) {
      setError(err.response?.data || "Unable to fetch transactions.");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...transactions];

    if (search) {
      result = result.filter((transaction) =>
        transaction.merchantName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (filter !== "ALL") {
      result = result.filter(
        (transaction) =>
          transaction.status === filter || transaction.paymentMode === filter,
      );
    }

    setFilteredTransactions(result);
  }, [search, filter, transactions]);

  if (loading) {
    return <Loader message="Loading Transactions..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>

      {/* Search Card */}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex gap-4">
          {/* <input
                        type="number"
                        placeholder="Enter Card ID"
                        value={cardId}
                        onChange={(e)=>
                            setCardId(e.target.value)
                        }
                        className="
                            flex-1
                            border
                            rounded-lg
                            px-4
                            py-3
                        "
                    /> */}
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
            onClick={fetchTransactions}
            className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-6
                            rounded-lg
                        "
          >
            Load Transactions
          </button>
        </div>
      </div>

      {/* Search */}

      <SearchBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        placeholder="Search Merchant..."
        filterOptions={[
          "ALL",
          "SUCCESS",
          "FAILED",
          "PENDING",
          "ONLINE",
          "UPI",
          "POS",
        ]}
      />

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-6">
          {error}
        </div>
      )}

      <div className="mt-8">
        <TransactionTable transactions={filteredTransactions} />
      </div>
    </div>
  );
};

export default Transactions;
