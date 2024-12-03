import { useEffect, useState } from "react";
import { Training } from "../api/training";
import { getTrainingOfTheDay } from "../api/training-daily";

type TrainingDaily = {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    created_by?: number;
    training: Training | undefined;
    day: number;
}


export const useTrainingOfTheDay = () => {
    const [trainingOfTheDay, setTrainingOfTheDay] = useState<TrainingDaily | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTrainingOfTheDay = async () => {
        try {
            setLoading(true);
            const data = await getTrainingOfTheDay();
            setTrainingOfTheDay(data);
        } catch (err) {
            setError('Failed to fetch training of the day');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainingOfTheDay();
    }, []);

    return { trainingOfTheDay, loading, error, refetch: fetchTrainingOfTheDay };
};