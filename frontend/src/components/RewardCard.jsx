import { FaGift, FaCoins, FaCalendarAlt } from "react-icons/fa";

const RewardCard = ({ reward, onRedeem }) => {
  if (!reward) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-gray-500 text-xl">
          No Reward Information Available
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
                bg-gradient-to-r
                from-yellow-400
                via-yellow-500
                to-orange-500
                rounded-2xl
                shadow-xl
                text-white
                p-8
            "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <FaGift size={28} />

        <h2 className="text-2xl font-bold">Reward Balance</h2>
      </div>

      {/* Reward Points */}

      <div className="mt-8">
        <p className="text-lg">Reward Points</p>

        <h1 className="text-5xl font-bold mt-2">{reward.rewardPoints}</h1>
      </div>

      {/* Cash Value */}

      <div className="mt-8 flex items-center gap-3">
        <FaCoins size={24} />

        <div>
          <p>Reward Value</p>

          <h2 className="text-3xl font-bold">₹ {reward.rewardValue}</h2>
        </div>
      </div>

      {/* Last Updated */}

      <div className="mt-8 flex items-center gap-3">
        <FaCalendarAlt />

        <span>
          Last Updated :
          <strong className="ml-2">
            {new Date(reward.lastUpdated).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </strong>
        </span>
      </div>

      {/* Redeem Button */}

      <button
        onClick={onRedeem}
        className="
                    mt-8
                    w-full
                    bg-white
                    text-orange-600
                    font-bold
                    py-3
                    rounded-lg
                    hover:bg-gray-100
                    transition
                "
      >
        Redeem Rewards
      </button>
    </div>
  );
};

export default RewardCard;
