import axiosInstance from '../api/axiosConfig';
import { API_URL } from '../config/config';

export enum MuscleGroup {
    Peito = "Peito",
    Pernas = "Pernas",
    Costas = "Costas",
    Ombros = "Ombros",
    Biceps = "Bíceps",
    Triceps = "Tríceps",
    Abdomen = "Abdômen",
    Gluteos = "Glúteos",
    Panturrilha = "Panturrilha",
    Trapezio = "Trapézio",
    Antebraco = "Antebraço",
    Quadriceps = "Quadríceps",
    None = ''
}

export enum RestTime {
    ThirdySeconds = "30s",
    OneMinute = "1min",
    OneMinuteAndThirdySeconds = "1min 30s",
    TwoMinutes = "2min",
    TwoMinutesAndThirdySeconds = "2min 30s",
    ThreeMinutes = "3min",
    ThreeMinutesAndThirdySeconds = "3min 30s",
    FourMinutes = "4min",
    FourMinutesAndThirdySeconds = "4min 30s",
    FiveMinutes = "5min",
    FiveMinutesAndThirdySeconds = "5min 30s",
    SixMinutes = "6min"
}

export interface Exercise {
    id?: number;
    name?: string;
    muscle_group?: MuscleGroup | string;
    series?: number;
    repetitions?: number;
    exercise_weight?: number;
    rest_time?: RestTime | string;
    observation?: string;
}

export const createExercise = async (exercise: Exercise) => {

    const url = `${API_URL}exercises`;

    const response = await axiosInstance.post(url, exercise);

    return response.data;
};

export const getExercises = async (id?: number) => {

    const url = `${API_URL}exercises${id ? `/${id}` : ''}`;

    try {
        const response = await axiosInstance.get(url);

        return response.data;
    } catch (error) {
        console.error('Error getting exercises:', error);
        throw error;
    }
}

export const editExercise = async (id: number, exercise: Exercise) => {
   
    const url = `${API_URL}exercises/${id}`;

    console.log('editExercise', exercise);
    
    const response = await axiosInstance.put(url, exercise);

    return response.data;
}

export const deleteExercise = async (id: number) => {
    const url = `${API_URL}exercises/${id}`;

    const response = await axiosInstance.delete(url);

    return response.data;
}