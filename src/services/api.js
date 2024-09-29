import axios from "axios";

const { VITE_API_KEY } = import.meta.env;

export const api = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${VITE_API_KEY}`,
  },
});
