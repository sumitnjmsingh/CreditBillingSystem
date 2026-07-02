import axios from "./axios";

export const getAllCards = async () => {
  const response = await axios.get("/cards");
  return response.data;
};

export const createCard = async (cardData) => {
  const response = await axios.post(
    "/card/createCard",
    cardData
  );

  return response.data;
};

export const getCardTransactions = async (cardId) => {
  const response = await axios.get(
    `/card/${cardId}/transactions`
  );

  return response.data;
};

export const getAvailableLimit = async (cardId) => {
  const response = await axios.get(
    `/card/${cardId}/availableLimit`
  );

  return response.data;
};

export const getStatement = async (cardId) => {
  const response = await axios.get(
    `/card/${cardId}/statement`
  );

  return response.data;
};

export const blockCard = async (cardId) => {
  const response = await axios.put(
    `/card/${cardId}/block`
  );

  return response.data;
};

export const unblockCard = async (cardId) => {
  const response = await axios.put(
    `/card/${cardId}/unblock`
  );

  return response.data;
};

export const deleteCard = async (cardId) => {
  const response = await axios.delete(
    `/card/${cardId}`
  );

  return response.data;
};

export const downloadCSV = async () => {

  const response = await axios.get(
    "/transactions/download/csv",
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;

  link.download = "transactions.csv";

  document.body.appendChild(link);

  link.click();

  link.remove();
};

export const downloadPDF = async () => {

  const response = await axios.get(
    "/transactions/download/pdf",
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;

  link.download = "transactions.pdf";

  document.body.appendChild(link);

  link.click();

  link.remove();
};