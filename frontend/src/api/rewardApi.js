import axios from "./axios";

export const getRewardBalance = async (cardId) => {
  const response = await axios.get(
    `/card/${cardId}/rewardBalance`
  );

  return response.data;
};