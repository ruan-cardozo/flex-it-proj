import { API_URL } from "../config/config";
import axiosInstance from "../api/axiosConfig"; // Corrigido o caminho de importação

export interface Metric {
  id?: number;
  data: string | Date;
  peso: number;
  altura: number;
  imc?: number;
}

export const createMetric = async (metricData: Metric) => {
  try {
    const url = `${API_URL}metrics/create`;
    const response = await axiosInstance.post(url, metricData);
    return response.data;
  } catch (error) {
    console.error('Error creating metric:', error);
    throw error;
  }
};

export const getMetrics = async () => {
  try {
    const url = `${API_URL}metrics`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};

export const getMetricById = async (id: number) => {
  try {
    const url = `${API_URL}metrics/${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching metric by id:', error);
    throw error;
  }
};

export const updateMetric = async (id: number, metricData: Metric) => {
  try {
    const url = `${API_URL}metrics/${id}`;
    const response = await axiosInstance.patch(url, metricData);
    return response.data;
  } catch (error) {
    console.error('Error updating metric:', error);
    throw error;
  }
};

export const deleteMetric = async (id: number) => {
  try {
    const url = `${API_URL}metrics/${id}`;
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error('Error deleting metric:', error);
    throw error;
  }
};