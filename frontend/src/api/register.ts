import { API_URL } from '../config/config';
import axiosInstance from './axiosConfig';

interface User {
  user_name?: string;
  name: string;
  email: string;
  password: string;
}

export const register = async (userData: User) => {
  try { 

    const url = `${API_URL}users`;

    const response = await axiosInstance.post(url, userData);

    return response;
  } catch (error) {
    console.error(error);
  }
};