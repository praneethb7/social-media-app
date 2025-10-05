import axios from "axios";
import { API_BASE_URL } from "./config";
// import type { User } from "@/redux/userSlice";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/user/current', { withCredentials: true })
    return response.data
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch user data";
  }
};

export const getProfile = async (userName: string) => {
  try {
    const response = await api.get(`/api/user/getprofile/${userName}`)
    return response.data
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch user data";
  }
}

export const editProfile = async (data : FormData) => {
  try {
    const response = await api.post(`/api/user/editprofile/`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error:any) {
    throw error.response?.data?.message || "Failed to fetch user data";
  }
};

