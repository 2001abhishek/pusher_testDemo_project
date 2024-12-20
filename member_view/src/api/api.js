import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};