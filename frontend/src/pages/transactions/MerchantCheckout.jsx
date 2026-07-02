import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import merchants from "../../data/merchants";
import { FaLock, FaCreditCard, FaStore } from "react-icons/fa";
import toast from "react-hot-toast";

const MerchantCheckout = () => {
  const { merchant } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get("/cards");

      setCards(response.data);

      if (response.data.length > 0) {
        setCardForm((prev) => ({
          ...prev,
          cardNumber: response.data[0].cardNumber,
        }));
      }
    } catch (err) {
      toast.error("Unable to fetch cards.");
    }
  };

  const merchantData = merchants.find((m) => m.slug === merchant);

  if (!merchantData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Merchant Not Found
      </div>
    );
  }

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [merchantForm, setMerchantForm] = useState({
    merchantId: merchantData.id,

    merchantName: merchantData.name,

    merchantCategory: "SHOPPING",

    merchantLocation: "",

    amount: "",

    currency: "INR",

    paymentMode: "ONLINE",

    status: "SUCCESS",

    remarks: "",
  });

  const [cardForm, setCardForm] = useState({
    cardNumber: "",

    cvv: "",
  });

  useEffect(() => {
    setMerchantForm((prev) => ({
      ...prev,

      merchantId: merchantData.id,

      merchantName: merchantData.name,
    }));

    setResponse(null);
  }, [merchantData]);

  const handleMerchantChange = (e) => {
    setMerchantForm({
      ...merchantForm,

      [e.target.name]: e.target.value,
    });
  };

  const handleCardChange = (e) => {
    setCardForm({
      ...cardForm,

      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const request = {
      ...merchantForm,

      ...cardForm,
    };

    try {
      setLoading(true);

      const res = await axios.post("/completePayment", request);

      setResponse(res.data);

      toast.success("Payment Successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className={`${merchantData.color} text-white px-8 py-5 flex justify-between items-center`}
      >
        <h1 className="text-3xl font-bold">{merchantData.name}</h1>

        <div className="flex items-center gap-2">
          <FaLock />
          Secure Checkout
        </div>
      </div>

      <form
        onSubmit={handlePayment}
        className="max-w-7xl mx-auto py-10 grid lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-8">
          {/* Merchant Details */}

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaStore className="text-blue-600" />

              <h2 className="text-2xl font-bold">Merchant Details</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold">Merchant Name</label>

                <input
                  type="text"
                  name="merchantName"
                  value={merchantForm.merchantName}
                  onChange={handleMerchantChange}
                  className="w-full mt-2 border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="font-semibold">Merchant Category</label>

                <select
                  name="merchantCategory"
                  value={merchantForm.merchantCategory}
                  onChange={handleMerchantChange}
                  className="w-full mt-2 border rounded-lg p-3"
                >
                  <option>SHOPPING</option>
                  <option>FOOD</option>
                  <option>TRAVEL</option>
                  <option>ENTERTAINMENT</option>
                  <option>GROCERY</option>
                  <option>FUEL</option>
                  <option>MEDICAL</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Merchant Location</label>

                <input
                  type="text"
                  name="merchantLocation"
                  value={merchantForm.merchantLocation}
                  onChange={handleMerchantChange}
                  className="w-full mt-2 border rounded-lg p-3"
                  placeholder="Bangalore"
                  required
                />
              </div>

              <div>
                <label className="font-semibold">Amount</label>

                <input
                  type="number"
                  name="amount"
                  value={merchantForm.amount}
                  onChange={handleMerchantChange}
                  className="w-full mt-2 border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="font-semibold">Currency</label>

                <select
                  name="currency"
                  value={merchantForm.currency}
                  onChange={handleMerchantChange}
                  className="w-full mt-2 border rounded-lg p-3"
                >
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Payment Mode</label>

                <select
                  name="paymentMode"
                  value={merchantForm.paymentMode}
                  onChange={handleMerchantChange}
                  className="w-full mt-2 border rounded-lg p-3"
                >
                  <option>ONLINE</option>
                  <option>UPI</option>
                  <option>POS</option>
                  <option>CONTACTLESS</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="font-semibold">Remarks</label>

                <textarea
                  rows={4}
                  name="remarks"
                  value={merchantForm.remarks}
                  onChange={handleMerchantChange}
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>
            </div>
          </div>

          {/* Card Details */}

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaCreditCard className="text-blue-600" />

              <h2 className="text-2xl font-bold">Card Details</h2>
            </div>

            <div className="space-y-6">
              <div className="flex">
                <label className="font-semibold">Card Number</label>

                <select
                  value={cardForm.cardNumber}
                  onChange={(e) =>
                    setCardForm({
                      ...cardForm,
                      cardNumber: e.target.value,
                    })
                  }
                  className="
                    w-full
                    mt-2
                    border
                    rounded-lg
                    p-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-600
                  "
                >
                  <option value="">Select Credit Card</option>

                  {cards.map((card) => (
                    <option key={card.cardId} value={card.cardNumber}>
                      **** **** **** {card.cardNumber.slice(-4)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-1 gap-6">

                <div>
                  <label className="font-semibold">CVV</label>

                  <input
                    type="password"
                    name="cvv"
                    maxLength={3}
                    value={cardForm.cvv}
                    onChange={handleCardChange}
                    className="w-full mt-2 border rounded-lg p-3"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 h-fit sticky top-8">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-5">
            <div className="flex justify-between">
              <span className="text-gray-600">Merchant</span>

              <span className="font-semibold">
                {merchantForm.merchantName || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Category</span>

              <span className="font-semibold">
                {merchantForm.merchantCategory || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Location</span>

              <span className="font-semibold">
                {merchantForm.merchantLocation || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Currency</span>

              <span className="font-semibold">{merchantForm.currency}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Mode</span>

              <span className="font-semibold">{merchantForm.paymentMode}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Remarks</span>

              <span className="font-semibold">
                {merchantForm.remarks || "-"}
              </span>
            </div>
          </div>

          <hr className="my-8" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span className="text-green-600">₹{merchantForm.amount || 0}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
                            mt-8
                            w-full
                            bg-green-600
                            hover:bg-green-700
                            disabled:bg-gray-400
                            text-white
                            py-4
                            rounded-xl
                            text-xl
                            font-bold
                            transition
                        "
          >
            {loading
              ? "Processing Payment..."
              : `Pay ₹${merchantForm.amount || 0}`}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-green-700">
            <FaLock />
            SSL Secured Payment
          </div>
        </div>
      </form>

      {response && (
        <div className="max-w-7xl mx-auto mb-10">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8">Payment Response</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <strong>Status :</strong> {response.status}
              </div>

              <div>
                <strong>Reference Number :</strong> {response.referenceNumber}
              </div>

              <div>
                <strong>Transaction Id :</strong> {response.transactionId}
              </div>

              <div>
                <strong>Available Limit :</strong> ₹{response.availableLimit}
              </div>

              <div>
                <strong>Reward Points :</strong> {response.rewardPoints}
              </div>

              {response.reason && (
                <div className="text-red-600">
                  <strong>Failure Reason :</strong> {response.reason}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantCheckout;
