import axios from "./axios";

export const createBilling = async (cardId, billingData) => {
  const response = await axios.post(
    `/cards/${cardId}/billing`,
    billingData
  );

  return response.data;
};

export const getStatement = async (cardId) => {
  const response = await axios.get(
    `/card/${cardId}/statement`
  );

  return response.data;
};