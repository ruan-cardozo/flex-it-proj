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

    const fetchTrainingOfTheDay = async () => {
        try {
            setLoading(true);
            const data = await getTrainingOfTheDay();
            if (data) {
                setTrainingOfTheDay(data);
            } else {
                setTrainingOfTheDay(null);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainingOfTheDay();
    }, []);

    return { trainingOfTheDay, loading, refetch: fetchTrainingOfTheDay };
};