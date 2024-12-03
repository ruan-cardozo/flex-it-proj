import axiosInstance from "./axiosConfig";
import { API_URL } from "../config/config";

type Training = {
    id: number;
    name: string;
}

interface TrainingDaily {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    created_by?: number;
    training: Training | undefined;
    day: number;
}

export const createTrainingDaily = async (trainingDailyData: TrainingDaily) => {

    const url = `${API_URL}daily-training`;

    const response = await axiosInstance.post(url, trainingDailyData);

    return response;
}

export const getAllTrainingDaily = async () => {
    
    const url = `${API_URL}daily-training`;
    
    const response = await axiosInstance.get(url);

    return response.data;
}

export const updateTrainingDaily = async (id: number, trainingDailyData: TrainingDaily) => {
    
    const url = `${API_URL}daily-training/${id}`;
    
    const response = await axiosInstance.put(url, trainingDailyData);
    
    return response;
}

export const deleteTrainingDaily = async (id: number) => {
    
    const url = `${API_URL}daily-training/${id}`;
    
    const response = await axiosInstance.delete(url);
    
    return response;
}

export const getTrainingOfTheDay = async () => {
    
    const url = `${API_URL}daily-training/training-of-the-day`

    const response = await axiosInstance.get(url);

    return response.data;
}