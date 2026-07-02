import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const CreateCard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardType: "VISA",
    cardVariant: "CLASSIC",
    creditLimit: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/card/createCard", formData);

      toast.success("Card Created Successfully");

      navigate("/cards");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create card.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Creating Credit Card..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Credit Card
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Holder */}

          <div>
            <label className="font-semibold">Card Holder Name</label>

            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg px-4 py-3"
            />
          </div>

          {/* Card Type */}

          <div>
            <label className="font-semibold">Card Type</label>

            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg px-4 py-3"
            >
              <option value="VISA">VISA</option>

              <option value="MASTERCARD">MASTERCARD</option>

              <option value="RUPAY">RUPAY</option>
            </select>
          </div>

          {/* Variant */}

          <div>
            <label className="font-semibold">Card Variant</label>

            <select
              name="cardVariant"
              value={formData.cardVariant}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg px-4 py-3"
            >
              <option value="CLASSIC">CLASSIC</option>

              <option value="GOLD">GOLD</option>

              <option value="PLATINUM">PLATINUM</option>
            </select>
          </div>

          {/* Credit Limit */}

          <div>
            <label className="font-semibold">Credit Limit</label>

            <input
              type="number"
              name="creditLimit"
              value={formData.creditLimit}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-3
                rounded-lg
                font-semibold
            "
          >
            Create Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
