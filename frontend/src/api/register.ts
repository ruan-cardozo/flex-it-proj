import axios from 'axios';
import { API_URL } from '../config/config';

interface CreateUserDto {
  user_name?: string;
  name: string;
  email: string;
  password: string;
}

export const register = async (userData: CreateUserDto) => {
  try { 

    const url = `${API_URL}users`;

    const response = await axios.post(url, userData);

    console.log(response)
    return response.data;
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