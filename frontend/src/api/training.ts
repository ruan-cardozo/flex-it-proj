import { API_URL } from "../config/config";
import axiosInstance from "./axiosConfig";
import { Exercise } from "./exercise";

export enum TrainingObjective {
    Cardiovascular = "Treino cardiovascular",
    Definition = "Treino de definição",
    Strength = "Treino de força",
    Functional = "Treino funcional",
    HIIT = "Treino HIIT",
    Hypertrophy = "Treino de hipertrofia",
    MuscularEndurance = "Treino de resistência muscular",
    Therapeutic = "Treino terapêutico"
}

export enum Frequency {
    OncePerWeek = "1x por semana",
    TwicePerWeek = "2x por semana",
    ThricePerWeek = "3x por semana",
    FourTimesPerWeek = "4x por semana",
    FiveTimesPerWeek = "5x por semana",
    SixTimesPerWeek = "6x por semana",
    SevenTimesPerWeek = "7x por semana"
}

export interface TrainingExercise {
    trainingId: number;
    exerciseId: number;
}

export interface Training {
    id?: number;
    name: string;
    training_objective: TrainingObjective;
    weekly_frequency: Frequency;
    start_date: Date;
    end_date: Date;
    necessary_equipment: string;
    trainingExercises?: Array<Exercise>;
}

export const createTraining = async (trainingData: Training) => {
    try {

        const url = `${API_URL}training`;

        const response = await axiosInstance.post(url, trainingData);

        return response;
        
    } catch (error) {
        console.error(error);
    }
}

export const editTraining = async (trainingData: Training, trainingId: number) => {
    try {

        const url = `${API_URL}training/${trainingId}`;

        const response = await axiosInstance.put(url, trainingData);

        return response;

    } catch (error) {
        console.error(error);
    }
}

export const deleteTraining = async (trainingId: number) => {
    const url = `${API_URL}training/${trainingId}`;

    const response = await axiosInstance.delete(url);

    return response;
}

export const getTrainingById = async (trainingId: number) => {
    const url = `${API_URL}training/${trainingId}`;

    const response = await axiosInstance.get(url);

    return response.data;
}

export const getTrainings = async () => {
    try {

        const url = `${API_URL}training`;

        const response = await axiosInstance.get(url);

        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export const printTraining = async (trainingId: number) => {
    const url = `${API_URL}training/print-training/${trainingId}`;

    const response = await axiosInstance.get(url, {
        responseType: 'blob'
    });
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    const pdfUrl = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');

    link.href = pdfUrl;
    link.setAttribute('download', `training-${trainingId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}