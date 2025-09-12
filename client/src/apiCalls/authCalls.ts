import axios from "axios";
import { API_BASE_URL } from "./config";
import type { User } from "@/redux/userSlice";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

export const signUp = async (userData: Partial<User>) => {
  const response = await api.post("/api/auth/signup", userData);
  return response.data;
};

export const signIn = async (userData: Partial<User>) => {
  const response = await api.post("/api/auth/signin", userData);
  return response.data;
};

export const getCurrentUser = async (): Promise<User | { user: User }> => {
  const response = await api.get("/api/user/current");
  return response.data;
};
