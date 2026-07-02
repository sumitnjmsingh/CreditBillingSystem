import axios from "./axios";

export const payBill = async (cardId, paymentData) => {
  const response = await axios.post(
    `/payment/${cardId}/payBill`,
    paymentData
  );

  return response.data;
};