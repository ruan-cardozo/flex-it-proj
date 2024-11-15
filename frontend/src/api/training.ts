import { API_URL } from "../config/config";
import axiosInstance from "./axiosConfig";

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
    name: string;
    training_objective: TrainingObjective;
    weekly_frequency: Frequency;
    start_date: Date;
    end_date: Date;
    necessary_equipment: string;
    exercise_ids?: Array<number>;
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

        console.log(trainingData);

        const response = await axiosInstance.put(url, trainingData);

        return response;

    } catch (error) {
        console.error(error);
    }
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