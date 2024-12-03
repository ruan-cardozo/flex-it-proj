import { useEffect, useState } from "react";
import { CustomCard } from "../../components/CustomCard/CustomCard";
import Header from "../../components/Header/Header";
import LeftSideColumn from "../../components/LeftSideColumn/LeftSideColumn";
import './style/TrainingPage.css';
import DialogForm from "../../components/DialogForm/DialogForm";
import { useStylesCustomCard } from "./style/TrainingPage.const";
import DialogTrainingContent from "./Dialogs/DialogTrainingContent";
import DialogExerciseContent from "./Dialogs/DialogExerciseContent";
import { useNavigate } from "react-router-dom";
import MonthlyCalendar from "../../components/MonthlyCalendar/MonthlyCalendar";
import { Card, Text } from "@fluentui/react-components";
import { useTrainingOfTheDay } from "../../hooks/getUserTodayTraining";
import { DefaultButton, IStackStyles, IStackTokens, PrimaryButton, Stack } from "@fluentui/react";
import { Checkbox } from "@fluentui/react-components";
import { createManyGoals, fetchGoals, Goal, Goals } from "../../api/goals";


interface CustomGridAreaProps {
    onExerciseCardClick: () => void; 
    onTrainingCardClick: () => void;
}

export default function TrainingPage() {
    const [isExerciseModalOpen, setExerciseIsModalOpen] = useState(false);
    const [isTrainingModalOpen, setTrainingIsModalOpen] = useState(false);

    const handleExerciseCardClick = () => {
        setExerciseIsModalOpen(true);
    };

    const handleTrainingCardClick = () => {
        setTrainingIsModalOpen(true);
    };

    const handleCloseExerciseCardClick = () => {
        setExerciseIsModalOpen(false);
    };

    const handleCloseTrainingCardClick = () => {
        setTrainingIsModalOpen(false);
    };

    return (
        <>
            <LeftSideColumn />
            <div className="training-page">
                <Header style={{ textAlign: 'left' }} title="Bem vindo ao módulo de treinos!" />
                <PageParagraph />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                    <MonthlyCalendar />
                    <TrainingDayCard />
                    <WeekGoalsCard />
                </div>
                <CustomGridArea 
                    onExerciseCardClick={handleExerciseCardClick} 
                    onTrainingCardClick={handleTrainingCardClick} 
                />
                <DialogForm
                    dialogContent={<DialogTrainingContent />}
                    formTitle="Criar treino"
                    isOpen={isTrainingModalOpen}
                    onClose={handleCloseTrainingCardClick}
                />
                <DialogForm
                    dialogContent={<DialogExerciseContent />}
                    formTitle="Criar exercícios"
                    isOpen={isExerciseModalOpen}
                    onClose={handleCloseExerciseCardClick}
                />
            </div>
        </>
    );
}

function TrainingDayCard() {

    const { trainingOfTheDay, loading, error, refetch } = useTrainingOfTheDay();
    const stackTokens: IStackTokens = { childrenGap: 10 };
    const stackStyles: IStackStyles = { root: { width: '100%' } };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    
    if (!trainingOfTheDay) {
        return (
            <Card
                style={{ marginLeft: '50px', width: '585px', height: '300px' }}
            >
                <Text size={500} style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                }} block><strong>Treino do dia</strong></Text>
                <Text></Text>
                <Text>Nenhum treino cadastrado para hoje</Text>
            </Card>
        );
    }


    return (
        <Card style={{ marginLeft: '25px', width: '585px', height: '300px', overflowY: 'scroll', padding: '20px' }}>
            {trainingOfTheDay && (
                <Stack tokens={stackTokens} styles={stackStyles}>
                    <Text size={500}>Treino do dia: {trainingOfTheDay.training?.name}</Text>
                    <Text size={500}>Exercícios:</Text>
                    <Stack tokens={stackTokens}>
                        {trainingOfTheDay.training?.trainingExercises?.map((te) => (
                            <Card key={te.id} style={{ padding: '10px', marginBottom: '10px' }}>
                                <Stack tokens={stackTokens}>
                                    <Text size={500}>{te.exercise.name}</Text>
                                    <Text>Grupo Muscular: {te.exercise.muscle_group}</Text>
                                    <Text>Séries: {te.exercise.series}</Text>
                                    <Text>Repetições: {te.exercise.repetitions}</Text>
                                    <Text>Peso: {te.exercise.exercise_weight} kg</Text>
                                    <Text>Tempo de Descanso: {te.exercise.rest_time}</Text>
                                    <Text>Observação: {te.exercise.observation}</Text>
                                </Stack>
                            </Card>
                        ))}
                    </Stack>
                </Stack>
            )}
        </Card>
    );
}

function CustomGridArea({ onExerciseCardClick, onTrainingCardClick }: CustomGridAreaProps) {
    const customCardStyle = useStylesCustomCard();
    const navigate = useNavigate();

    return (
        <div className="card-grid">
            <CustomCard
                className={customCardStyle.main}
                onClick={onExerciseCardClick}
                cardTitle="Criar exercícios"
                cardParagraph="Clique aqui para criar e personalizar um exercício adaptado às suas necessidades!"
            />
            <CustomCard
                className={customCardStyle.main}
                onClick={onTrainingCardClick}
                cardTitle="Criar treinos"
                cardParagraph="Clique aqui para criar e personalizar um treino adaptado às suas necessidades!"
            />
            <CustomCard
                className={customCardStyle.main}
                onClick={() => navigate('/treinos/exercicios')}
                cardTitle="Visualizar exercícios"
                cardParagraph="Clique aqui para visualizar seus exercícios e realizar edições"
            />
            <CustomCard
                className={customCardStyle.main}
                onClick={() => navigate('/treinos/visualizar')}
                cardTitle="Visualizar treinos"
                cardParagraph="Clique aqui para visualizar seus treinos, fazer edições rápidas e imprimir suas rotinas personalizadas!"
            />
        </div>
    );
}




const stackTokens: IStackTokens = { childrenGap: 10 };

function WeekGoalsCard() {
    const [goals, setGoals] = useState<Goals | []>([]);

    useEffect(() => {
        fetchGoalsFromAPI();
    }, []);

    const fetchGoalsFromAPI = async () => {
        try {
            const apiGoals = await fetchGoals();
            setGoals(apiGoals.map((goal: { goal: string; done: boolean }) => ({ ...goal, isEditing: false })));
        } catch (error) {
            console.error('Failed to fetch goals:', error);
        }
    };

    const handleCreateGoals = async () => {
        try {
            
            const apiGoalsCreated = await createManyGoals(goals);
            setGoals(apiGoalsCreated.goals.map((goal: { goal: string; done: boolean }) => ({ ...goal, isEditing: false })));
        } catch (error) {
            console.error('Failed to create goals:', error);
        }
    };

    const handleCheckboxChange = (index: number) => {
        setGoals(goals.map((goal, i) => i === index ? { ...goal, done: !goal.done as true } : goal));
    };

    const handleAddGoal = () => {
        const newGoal: Goal = { goal: '', done: false as true, isEditing: true };
        setGoals([...goals, newGoal]);
    };

    const handleGoalLabelChange = (index: number, newLabel: string) => {
        setGoals(goals.map((goal, i) => i === index ? { ...goal, goal: newLabel } : goal));
    };

    const toggleEditing = (index: number) => {
        setGoals(goals.map((goal, i) => i === index ? { ...goal, isEditing: !goal.isEditing } : goal));
    };

    const handleBlur = (index: number) => {
        const goal = goals[index];
        if (goal && goal.goal.trim() === '') {
            setGoals(goals.filter((_, i) => i !== index));
        } else {
            toggleEditing(index);
        }
    };

    return (
        <Card style={{ marginLeft: '25px', width: '400px', padding: '20px' }}>
            <Text style={{ textAlign: 'center', marginBottom: '20px', fontSize: 'large' }}><strong>Metas da semana</strong></Text>
            <Stack tokens={stackTokens}>
                {goals.map((goal, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            checked={goal.done}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        {goal.isEditing ? (
                            <input
                                type="text"
                                value={goal.goal}
                                onChange={(e) => handleGoalLabelChange(index, e.target.value)}
                                onBlur={() => handleBlur(index)}
                                autoFocus
                                style={{
                                    marginLeft: '10px',
                                    flex: 1,
                                    border: 'none',
                                    borderBottom: '1px solid #ccc',
                                    outline: 'none',
                                    backgroundColor: 'transparent',
                                }}
                            />
                        ) : (
                            <Text
                                onClick={() => toggleEditing(index)}
                                style={{ marginLeft: '10px', flex: 1, cursor: 'pointer' }}
                            >
                                {goal.goal}
                            </Text>
                        )}
                    </div>
                ))}
            </Stack>
            <DefaultButton iconProps={{ iconName: 'Add' }} onClick={handleAddGoal} style={{ marginTop: '20px' }}>
                Adicionar Meta
            </DefaultButton>
            <PrimaryButton iconProps={{ iconName: 'Save' }} onClick={handleCreateGoals} style={{ marginTop: '20px' }}>
                Salvar Metas
            </PrimaryButton>
        </Card>
    );
}

function PageParagraph() {
    return (
        <p className="training-page-description">
            O módulo de treinos permite criar, editar e imprimir treinos personalizados,
            organizar por categorias e acompanhar tudo em um calendário interativo para melhor controle.
        </p>
    );
}