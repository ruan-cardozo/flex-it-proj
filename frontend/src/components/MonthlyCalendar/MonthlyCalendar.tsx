import React, { useEffect, useState } from 'react';
import { Dialog, Button as DefaultButton, DialogFooter, DialogType, Dropdown, IDropdownOption } from '@fluentui/react';
import { getTrainings, getTrainingById } from '../../api/training';
import { getAllTrainingDaily, createTrainingDaily, updateTrainingDaily } from '../../api/training-daily';
import { Exercise } from '../../api/exercise';
import { Button } from '@fluentui/react-components';
import './MonthlyCalendar.css';
import { SaveFilled } from "@fluentui/react-icons";
import { useToast } from '../../context/ToastContext';

const MonthlyCalendar: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
    const [trainingsOptions, setTrainingsOptions] = useState<{ id: number, name: string }[]>([]);
    const [dailyTrainings, setDailyTrainings] = useState<{ [key: number]: { name: string, id: number } }>({});
    const [selectedDayTrainingId, setSelectedDayTrainingId] = useState<number | null>(null);
    const [selectedTrainingExercises, setSelectedTrainingExercises] = useState<Exercise[]>([]);
    const { showToast } = useToast();

    useEffect(() => {
        fetchTraining();
        fetchDailyTrainings();
    }, []);

    const fetchTraining = async () => {
        try {
            const trainings = await getTrainings();
            const formattedTrainings = trainings.map((training: any) => ({
                id: training.id,
                name: training.name,
            }));
            setTrainingsOptions(formattedTrainings);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDailyTrainings = async () => {
        try {
            const dailyTrainings = await getAllTrainingDaily();
            const formattedDailyTrainings = dailyTrainings.reduce((acc: any, training: any) => {
                acc[training.day] = { name: training.training.name, id: training.id };
                return acc;
            }, {});
            setDailyTrainings(formattedDailyTrainings);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTrainingExercises = async (trainingId: number) => {
        try {
            const training = await getTrainingById(trainingId);
            setSelectedTrainingExercises(training.trainingExercises || []);
        } catch (error) {
            console.error('Erro ao buscar exercícios do treino:', error);
        }
    };

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.toLocaleString('default', { month: 'long' });
    const firstDayOfMonth = new Date(currentYear, today.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="empty-day" />);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <div key={i} className="calendar-day">
                    <DefaultButton style={{ minWidth: '0', border: 'none', height: '100%' }} text={i.toString()} onClick={() => handleDayClick(i)} />
                </div>
            );
        }
        return days;
    };

    const handleDayClick = async (day: number) => {
        setSelectedDay(day);
        const training = dailyTrainings[day];
        if (training) {
            const trainingId = trainingsOptions.find(option => option.name === training.name)?.id;
            if (trainingId) {
                setSelectedWorkout(trainingId.toString());
                setSelectedDayTrainingId(training.id);
                await fetchTrainingExercises(trainingId);
            }
        } else {
            setSelectedWorkout(null);
            setSelectedDayTrainingId(null);
            setSelectedTrainingExercises([]);
        }
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedTrainingExercises([]);
    };

    const handleSaveWorkout = async () => {
        if (selectedDay !== null && selectedWorkout) {
            const selectedTraining = trainingsOptions.find(training => training.id.toString() === selectedWorkout);

            const payload = {
                day: selectedDay,
                training: selectedTraining,
            }

            if (selectedTraining) {
                try {
                    if (selectedDayTrainingId) {
                        await updateTrainingDaily(selectedDayTrainingId, payload);
                    } else {
                        await createTrainingDaily(payload);
                    }
                    setDailyTrainings(prev => ({ ...prev, [selectedDay]: { name: selectedTraining.name, id: selectedDayTrainingId || 0 } }));
                    showToast('Treino salvo com sucesso!', 'success');
                } catch (error) {
                    console.error('Erro ao salvar treino diário:', error);
                    showToast('Erro ao salvar treino diário.', 'error');
                }
            }
        }
        setIsDialogOpen(false);
    };

    const handleWorkoutChange = async (_: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
        if (option) {
            setSelectedWorkout(option.key as string);
            await fetchTrainingExercises(parseInt(option.key as string));
        }
    };

    return (
        <div className="calendar-container">
            <h1>Calendário de Treinos - {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)} {currentYear}</h1>
            <div className="days-of-week">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="day-header">
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar-grid">
                {renderDays()}
            </div>

            <Dialog
                hidden={!isDialogOpen}
                onDismiss={handleDialogClose}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: `Treino para o dia ${selectedDay}`,
                    closeButtonAriaLabel: 'Fechar',
                }}
            >
                <Dropdown
                    placeholder="Selecione um treino"
                    about="Treino"
                    options={trainingsOptions.map(training => ({ key: training.id.toString(), text: training.name }))}
                    selectedKey={selectedWorkout || undefined}
                    onChange={handleWorkoutChange}
                />
                {selectedTrainingExercises.length > 0 && (
                    <div>
                        <h3>Exercícios do Treino:</h3>
                        <ul>
                            {selectedTrainingExercises.map(exercise => (
                                <li key={exercise.exercise.id}>
                                    {exercise.exercise.name} - {exercise.exercise.series} séries de {exercise.exercise.repetitions} repetições
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <DialogFooter>
                    <Button
                        appearance="primary"
                        onClick={handleSaveWorkout}
                        icon={<SaveFilled />}
                    >
                        Salvar
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default MonthlyCalendar;