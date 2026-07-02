import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loader from "../../components/Loader";
import BillingCard from "../../components/BillingCard";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import toast from "react-hot-toast";

const Statement = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [statement, setStatement] = useState(null);
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

  const fetchStatement = async () => {
    if (!selectedCard) {
      toast.error("Please enter Card ID");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/card/${selectedCard}/statement`);

      setStatement(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch statement.");
      setStatement(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.get("/transactions/download/pdf", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "statement.pdf");

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (err) {
      console.log(err);
    }
  };

  const downloadCSV = async () => {
    try {
      const response = await axios.get("/transactions/download/csv", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.download = "statement.csv";

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loader message="Generating Statement..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Credit Card Statement</h1>

      {/* Card Search */}

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
            onClick={fetchStatement}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              rounded-lg
            "
          >
            Generate Statement
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 rounded-lg p-4 mb-8">
          {error}
        </div>
      )}

      {statement && (
        <>
          <BillingCard billing={statement} />

          <div className="mt-8 flex gap-4">
            <button
              onClick={downloadPDF}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-6
                py-3
                rounded-lg
                flex
                items-center
                gap-2
              "
            >
              <FaFilePdf />
              Download PDF
            </button>

            <button
              onClick={downloadCSV}
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-3
                rounded-lg
                flex
                items-center
                gap-2
              "
            >
              <FaFileCsv />
              Download CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Statement;
