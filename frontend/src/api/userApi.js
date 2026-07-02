import axios from "./axios";

export const signup = async (userData) => {
  const response = await axios.post(
    "/signup",
    userData
  );

  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(
    "/signin",
    credentials
  );

  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(
    "/forgot-password",
    {
      userEmail: email,
    }
  );

  return response.data;
};

export const resetPassword = async (resetData) => {
  const response = await axios.post(
    "/reset-password",
    resetData
  );

  return response.data;
};

export const changePassword = async (
  passwordData
) => {
  const response = await axios.post(
    "/change-password",
    passwordData
  );

  return response.data;
};

export const updateProfile = async (
  profileData
) => {
  const response = await axios.put(
    "/profile/update",
    profileData
  );

  return response.data;
};

export const logout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem("cardIds");

};