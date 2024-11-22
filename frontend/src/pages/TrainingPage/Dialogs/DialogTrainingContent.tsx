import React, { useEffect, useState } from 'react';
import { useStylesTraining } from '../style/TrainingPage.const';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomDropdown from '../../../components/CustomDropdown/CustomDropdown';
import { DateInput } from '../../../components/DateInput/DateInput';
import CustomSpinButton from '../../../components/SpinButton/SpinButton';
import { Button } from '@fluentui/react-components';
import { DeleteFilled } from '@fluentui/react-icons';
import { createTraining, editTraining, getTrainingById, Training } from '../../../api/training';
import { editExercise, getExercises } from '../../../api/exercise';
import { TrainingObjective, Frequency } from '../../../api/training';
import { useToast } from '../../../context/ToastContext';

interface DialogTrainingContentProps {
    training?: Training;
}

const DialogTrainingContent: React.FC<DialogTrainingContentProps> = ({ training }) => {
    const style = useStylesTraining();
    const dropdownOptions = [
        "Treino cardiovascular", "Treino de definição", "Treino de força", "Treino funcional", "Treino HIIT", "Treino de hipertrofia", "Treino de resistência muscular", "Treino terapêutico"
    ];
    const dropdownOptions2 = [
        "1x por semana", "2x por semana", "3x por semana", "4x por semana", "5x por semana", "6x por semana", "7x por semana"
    ];
    const [trainingId, setTrainingId] = useState<number | null>(training?.id || null);
    const [trainingName, setTrainingName] = useState<string>(training?.name || '');
    const [trainingObjective, setTrainingObjective] = useState<string>(training?.training_objective || '');
    const [trainingFrequency, setTrainingFrequency] = useState<string>(training?.weekly_frequency || '');
    const [startDate, setStartDate] = useState<Date | null>(training?.start_date ? new Date(training.start_date) : null);
    const [endDate, setEndDate] = useState<Date | null>(training?.end_date ? new Date(training.end_date) : null);
    const [equipment, setEquipment] = useState<string>(training?.necessary_equipment || '');
    const [selectedExercises, setSelectedExercises] = useState<{ id: number, name: string, exercise_weight: number, series: number, repetitions: number }[]>(training?.trainingExercises || []);
    console.log('11 -----> ',{selectedExercises});
    const [selectedExercise, setSelectedExercise] = useState<string>('');
    const [weight, setWeight] = useState<number>(0);
    const [series, setSeries] = useState<number>(0);
    const [repetitions, setRepetitions] = useState<number>(0);
    const [exerciseOptions, setExerciseOptions] = useState<{ id: string, name: string }[]>([]);
    const { showToast } = useToast();
    const [combinedExercises, setCombinedExercises] = useState<{ id: number, name: string, exercise_weight: number, series: number, repetitions: number }[]>([]);

    useEffect(() => {
        fetchExercises();
    }, []);

    useEffect(() => {
        const combined = [
            ...(training?.trainingExercises || []),
            ...selectedExercises
        ].reduce((acc, exercise) => {
            if (!acc.find(e => e.id === exercise.id)) {
                acc.push(exercise);
            }
            return acc;
        }, []);

        setCombinedExercises(combined);
    }, [selectedExercises, training?.trainingExercises]);
    
    const fetchExercises = async () => {
        try {
            const exercises = await getExercises();  
            const formattedExercises = exercises.map((exercise: any) => ({
                id: exercise.id,
                name: exercise.name
            }));
            setExerciseOptions(formattedExercises);
        } catch (error) {
            console.error('Erro ao buscar exercícios:', error);
        }
    };

    const fetchTrainingDetails = async (id: number) => {
        try {
            const trainingDetails = await getTrainingById(id);
            setTrainingName(trainingDetails.name);
            setTrainingObjective(trainingDetails.training_objective);
            setTrainingFrequency(trainingDetails.weekly_frequency);
            setStartDate(new Date(trainingDetails.start_date));
            setEndDate(new Date(trainingDetails.end_date));
            setEquipment(trainingDetails.necessary_equipment);
            setSelectedExercises(trainingDetails.trainingExercises);
        } catch (error) {
            console.error('Erro ao buscar detalhes do treino:', error);
        }
    };

    const handleSaveTraining = async () => {
        if (trainingName && trainingObjective && trainingFrequency && startDate && endDate && equipment) {
            const trainingData = {
                name: trainingName,
                training_objective: trainingObjective as TrainingObjective,
                weekly_frequency: trainingFrequency as Frequency,
                start_date: startDate,
                end_date: endDate,
                necessary_equipment: equipment,
                exercise_ids: selectedExercises.map(exercise => exercise.id)
            };

            try {
                if (trainingId) {
                    const response = await editTraining(trainingData, trainingId);
                    if (response && response.data) {
                        setTrainingId(response.data.id);
                        showToast('Treino editado com sucesso!', 'success');
                        setSelectedExercises([]);
                        fetchTrainingDetails(response.data.id);
                    }
                } else {
                    const response = await createTraining(trainingData);
                    if (response && response.data) {
                        setTrainingId(response.data.id);
                        showToast('Treino criado com sucesso!', 'success');
                        setSelectedExercises([]);
                        fetchTrainingDetails(response.data.id);
                    }
                }
            } catch (error) {
                console.error('Erro ao salvar treino:', error);
            }
        } else {
            showToast('Preencha todos os campos do treino.', 'error');
        }
    };

    const handleAddExercise = async () => {

        console.log(trainingId && selectedExercise && weight > 0 && series > 0 && repetitions > 0);
        
        if (trainingId && selectedExercise && weight > 0 && series > 0 && repetitions > 0) {
            
            const exerciseId = exerciseOptions.find(exercise => exercise.name === selectedExercise)?.id;

            const newExercise = { id: exerciseId, name: selectedExercise, weight, series, repetitions };
            setSelectedExercises(prevExercises => [...prevExercises, newExercise]);

            const exerciseData = {
                exercise_weight: weight,
                series: series,
                repetitions: repetitions,
            }

            try {
                const selectedExerciseObj = exerciseOptions.find(exercise => exercise.name === selectedExercise);

                console.log(selectedExerciseObj);

                if (selectedExerciseObj) {
                    const response = await editExercise(Number(selectedExerciseObj.id), exerciseData);

                    if (response.ok) {
                        showToast('Exercicio adicionado e atualizado com sucesso');
                        fetchTrainingDetails(trainingId);
                    }
                } else {
                    showToast('Exercício não encontrado');
                }
            } catch (error) {
                console.error('Erro ao adicionar exercício:', error);
            }

            setSelectedExercise('');
            setWeight(0);
            setSeries(0);
            setRepetitions(0);
        } else {
            showToast("Preencha todos os campos corretamente.", 'error');
        }
    };

    const handleRemoveExercise =  (index: number) => {
        
        setSelectedExercises(prevExercises => prevExercises.filter((_, i) => i !== index));
        setCombinedExercises(selectedExercises);
        training?.trainingExercises?.splice(index, 1);
    };

    return (
        <>
            <div className={style.dialogContentGrid}>
                <div>
                    <CustomInput 
                        className={style.customInput} 
                        about="Nome do treino" 
                        value={trainingName} 
                        onChange={(e) => setTrainingName(e.target.value)} />
                    <CustomDropdown 
                        className={style.customDropdown} 
                        dropdownOptions={dropdownOptions} 
                        about="Selecione o objetivo do treino" 
                        value={trainingObjective} 
                        onChange={(selectedValue) => setTrainingObjective(selectedValue)} />
                    <CustomDropdown 
                        className={style.customDropdown} 
                        dropdownOptions={dropdownOptions2} 
                        about="Frequência Semanal" 
                        value={trainingFrequency} 
                        onChange={(selectedValue) => setTrainingFrequency(selectedValue)} />
                    <DateInput 
                        about="Data de início" 
                        className={style.dateInput} 
                        value={startDate} 
                        onSelectDate={(date) => setStartDate(date || null)} />
                    <DateInput 
                        about="Data de término" 
                        className={style.dateInput} 
                        value={endDate} 
                        onSelectDate={(date) => setEndDate(date || null)} />
                    <CustomInput 
                        className={style.customInput} 
                        about="Equipamentos necessários" 
                        value={equipment} 
                        onChange={(e) => setEquipment(e.target.value)} />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Button className={style.addExerciseSaveButton} onClick={handleSaveTraining}>
                            {trainingId ? 'Salvar Treino' : 'Criar Treino'}
                        </Button>
                    </div>
                    {trainingId && (
                        <>
                            <p style={{ marginTop: '10px', textAlign: 'center' }}><strong>Agora abaixo adicione os exercícios para seu treino:</strong></p>
                            <CustomDropdown 
                                className={style.customDropdown} 
                                dropdownOptions={exerciseOptions.map(option => option.name)} 
                                about="Selecione um exercício" 
                                value={selectedExercise} 
                                onChange={(selectedValue) => setSelectedExercise(selectedValue)} 
                            />
                            <CustomSpinButton about="Peso" value={weight} onChange={setWeight} />
                            <CustomSpinButton about="Série" value={series} onChange={setSeries} />
                            <CustomSpinButton about="Repetições" value={repetitions} onChange={setRepetitions} />
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <Button className={style.addExerciseSaveButton} onClick={handleAddExercise}>Adicionar Exercício</Button>
                            </div>
                        </>
                    )}
                </div>
                <div className={style.exerciseList}>
                    {trainingId && (
                        <>
                            <h2>Exercícios Selecionados:</h2>
                            <ul>
                                {combinedExercises.map((exercise, index) => (
                                        console.log(exercise),
                                    <li key={index}>
                                        <Button
                                            icon={<DeleteFilled />}
                                            onClick={() => handleRemoveExercise(index)}
                                            style={{ minWidth: '25px', height: '25px', padding: '0', marginRight: '10px' }}
                                        />
                                        {exercise.name 
                                            ? exercise.name 
                                            : exercise.exercise.name} 
                                        - Peso: {exercise.exercise_weight 
                                            ? exercise.exercise_weight 
                                            : exercise.exercise.exercise_weight}kg, 
                                        Série: {exercise.series 
                                            ? exercise.series 
                                            : exercise.exercise.series}, 
                                        Repetições: {exercise.repetitions 
                                            ? exercise.repetitions 
                                            : exercise.exercise.repetitions}
                                    </li>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <Button
                                        style={{ width: '100%', height: '30px', padding: '0' }}
                                        className={style.addExerciseSaveButton}
                                        onClick={handleSaveTraining}
                                    >
                                        Adicionar exercícios ao treino
                                    </Button>
                                </div>
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DialogTrainingContent;