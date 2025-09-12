import axios from "axios";

const client = axios.create({
  baseURL: "https://api.example.com", // base url server
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(async (config) => {
  const token = "our_token_id";// server token id
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const endpoints = {
  user: {
    login: "/api/users/login",
  }
};

export default client;