import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

import Loader from "../../components/Loader";
import CardItem from "../../components/CardItem";
import BillingCard from "../../components/BillingCard";
import RewardCard from "../../components/RewardCard";
import TransactionTable from "../../components/TransactionTable";

const CardDetails = () => {
  const { cardId } = useParams();

  const [loading, setLoading] = useState(true);

  const [card, setCard] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [billing, setBilling] = useState(null);

  const [reward, setReward] = useState(null);

  useEffect(() => {
    fetchCardDetails();
  }, []);

  const fetchCardDetails = async () => {
    try {
      setLoading(true);

      const cards = await axios.get("/cards");

      const selectedCard = cards.data.find((c) => c.cardId == cardId);

      setCard(selectedCard);

      const transactionRes = await axios.get(`/card/${cardId}/transactions`);

      setTransactions(transactionRes.data);

      const billingRes = await axios.get(`/card/${cardId}/statement`);

      setBilling(billingRes.data);

      const rewardRes = await axios.get(`/card/${cardId}/rewardBalance`);

      setReward(rewardRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Loading Card Details..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Card Details</h1>

      {card && <CardItem card={card} onBlock={() => {}} />}

      <div className="mt-10">
        <BillingCard billing={billing} />
      </div>

      <div className="mt-10">
        <RewardCard reward={reward} onRedeem={() => {}} />
      </div>

      <div className="mt-10">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default CardDetails;
