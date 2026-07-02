import { useNavigate } from "react-router-dom";
import merchants from "../../data/merchants";

const MerchantSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-xl w-[500px]">
        <h1 className="text-3xl font-bold mb-8">Select Merchant</h1>

        <select
          className="border w-full p-3 rounded-lg"
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) {
              navigate(`/merchant/${e.target.value}`);
            }
          }}
        >
          <option value="">Choose Merchant</option>

          {merchants.map((m) => (
            <option key={m.id} value={m.slug}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MerchantSelection;
