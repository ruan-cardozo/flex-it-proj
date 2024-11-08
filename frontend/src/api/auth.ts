import axios from 'axios';
import { API_URL } from '../config/config';

export const login = async (user_name: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
        user_name,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao fazer login');
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao fazer logout');
  }
};