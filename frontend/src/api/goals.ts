import { API_URL } from "../config/config";
import axiosInstance from "./axiosConfig";

export type Goal = {
    goal: string;
    done: true;
    isEditing?: boolean;
}

export type Goals = Goal[];

export const createManyGoals = async (goals: Goals) => {

    for (const goal of goals) {

        const hasIsEditingProperty = goal.hasOwnProperty('isEditing');
    
        if (hasIsEditingProperty) {
            delete goal.isEditing
        }
    }

    const url = `${API_URL}training-goals/create-many`;

    const payload = {
        goals: goals
    }

    const response = await axiosInstance.post(url, payload);

    return response.data;
}   

export const fetchGoals = async () => {
    const url = `${API_URL}training-goals`;

    const response = await axiosInstance.get(url);

    return response.data;
}