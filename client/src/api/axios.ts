import axios from "axios";

// custom instance of axios used for requests that dont require authentication
export const axiosPublic = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

// custom instance of axios used for requests that require authentication
export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});