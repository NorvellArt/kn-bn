import axios from "axios";

const axiosBaseConfig = {
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

export const axiosPublic = axios.create(axiosBaseConfig);
export const axiosPrivate = axios.create(axiosBaseConfig);