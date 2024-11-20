import axios, { AxiosInstance } from "axios";

const API_URL = "https://localhost:7218";

export const TOKEN_KEY = "jwt_token";
export const api: AxiosInstance = axios.create({
    baseURL: API_URL,
  });