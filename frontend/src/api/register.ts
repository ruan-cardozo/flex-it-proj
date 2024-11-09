import axios from 'axios';
import { API_URL } from '../config/config';

interface User {
  user_name?: string;
  name: string;
  email: string;
  password: string;
}

export const register = async (userData: User) => {
  try { 

    const url = `${API_URL}users`;

    const response = await axios.post(url, userData);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Erro na requisição:', error.response?.data);
        console.error('Status do erro:', error.response?.status);
        console.error('Cabeçalhos do erro:', error.response?.headers);
      } else {
        console.error('Erro desconhecido:', error);
      }
      throw new Error('Erro ao registrar usuário');
  }
};