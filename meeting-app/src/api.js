import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const registerUser = (data) => axios.post(`${BASE_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${BASE_URL}/auth/login`, data);
export const joinMeeting = () => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    return axios.post(`${BASE_URL}/meet/join`, {}, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
      },
    });
  };
  
  export const disconnectMeeting = () => {
    const token = localStorage.getItem("token");
    return axios.post(`${BASE_URL}/meet/disconnect`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  