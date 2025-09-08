import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Define the shape of your userData (example, adjust as needed)
interface signUpData {
    name: string,
    userName: string;
    email: string;
    password: string;
}

interface signInData {
    userName: string;
    password: string;
}

// sign up
export const signUp = async (userData: signUpData) => {
    try {
        const response = await api.post("/api/auth/signup", userData);
        return response.data;
    } catch (e: any) {
        throw e.response.data;
    }
};

//  sign in
export const signIn = async (userData: signInData) => {
    try {
        const response = await api.post("/api/auth/signin", userData);
        return response.data;
    } catch (e: any) {
        throw e.response.data;
    }
}