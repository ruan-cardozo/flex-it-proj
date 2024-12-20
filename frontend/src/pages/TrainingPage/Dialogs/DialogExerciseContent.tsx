import { useState } from "react";
import { useStylesExercise } from "../style/TrainingPage.const";
import { createExercise, editExercise, Exercise, getExercises, MuscleGroup, RestTime } from "../../../api/exercise";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomSpinButton from "../../../components/SpinButton/SpinButton";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import { Button } from "@fluentui/react-components";
import { SaveFilled } from "@fluentui/react-icons";
import { useToast } from "../../../context/ToastContext";
import { AxiosError } from "axios";

interface DialogExerciseContentProps {
    selectedExercise?: Exercise;
}

const DialogExerciseContent: React.FC<DialogExerciseContentProps> = ({selectedExercise}) => {
    const style = useStylesExercise();
    const [exercise, setExercise] = useState({
        id: selectedExercise?.id || undefined,
        name: selectedExercise?.name || '',
        muscle_group: selectedExercise?.muscle_group || MuscleGroup.Peito,
        series: selectedExercise?.series || 0,
        repetitions: selectedExercise?.repetitions || 0,
        exercise_weight: selectedExercise?.exercise_weight || 0,
        rest_time: selectedExercise?.rest_time || RestTime.ThreeMinutes,
        observation: selectedExercise?.observation || ''
    });
    const [exerciseId, setExerciseId] = useState<null | number>(selectedExercise?.id || null);
    const { showToast } = useToast();
    const dropdownOptions2 = [
        "Peito", "Pernas", "Costas", "Ombros", "Bíceps", "Tríceps", "Abdômen", "Glúteos", "Panturrilha", "Trapézio", "Antebraço", "Quadríceps"
    ];
    const dropdownOptionsRest = [
        "30s", "1min", "1min 30s", "2min", "2min 30s", "3min", "3min 30s", "4min", "4min 30s", "5min", "5min 30s", "6min"
    ];

    const handleInputChange = (field: string, value: any) => {
        setExercise(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSaveExercise = async () => {
        try {

            if (exerciseId) {

                const response = await editExercise(exerciseId, exercise);

                if (response && response.data) {

                    fetchExercises(exerciseId);
                    showToast('Exercício foi atualizado com sucesso', 'success');
                }
            } else {
                
                const response = await createExercise(exercise);

                showToast('Exercício foi salvo com sucesso', 'success');
    
                if (response.data) {
    
                    fetchExercises(response.data.id);
                    setExerciseId(response.data.id);
                }
            }
        } catch (error) {

            if (error instanceof Error) {
                const axiosError = error as AxiosError;
                showToast((axiosError.response?.data as { message: string }).message, 'error');
            } else {
                console.error('An unknown error occurred');
            }
        }
    };

    const fetchExercises = async (id: number) => {
        try {
            const exerciseDetails = await getExercises(id);

            setExercise(exerciseDetails);
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    }

    return (
        <div className={style.dialogContentGrid}>
            <CustomInput 
                className={style.customInput} 
                about="Nome do exercício" 
                onChange={(e) => handleInputChange('name', e.target.value)} 
                value={exercise.name}
            />
            <CustomSpinButton 
                applyFormatter={false} 
                about="Reps" 
                value={exercise.repetitions}
                onChange={(val) => handleInputChange('repetitions', val)} 
            />
            <CustomSpinButton 
                about="Série" 
                value={exercise.series}
                onChange={(val) => handleInputChange('series', val)} 
            />
            <CustomSpinButton 
                applyFormatter={true} 
                about="Peso" 
                value={exercise.exercise_weight}
                onChange={(val) => handleInputChange('exercise_weight', val)} 
            />
            <CustomDropdown 
                className={style.customDropdown} 
                dropdownOptions={dropdownOptions2} 
                about="Selecione o objetivo do treino" 
                value={exercise.muscle_group}
                onChange={(selectedValue) => handleInputChange('muscle_group', selectedValue)} 
            />
            <CustomDropdown 
                className={style.customDropdown} 
                dropdownOptions={dropdownOptionsRest} 
                about="Selecione o tempo de descanso" 
                value={exercise.rest_time}
                onChange={(selectedValue) => handleInputChange('rest_time', selectedValue)}
                />
            <CustomInput 
                className={style.customInput} 
                value={exercise.observation}
                about="Observação" 
                onChange={(e) => handleInputChange('observation', e.target.value)} 
            />
            <br />
            <Button 
                style={{
                    marginLeft: '10px', 
                    maxWidth: '200px', 
                    width: '100%'
                }} 
                appearance="primary" 
                onClick={handleSaveExercise} 
                icon={<SaveFilled/>}>
                Salvar
            </Button>
        </div>
    );
};

export default DialogExerciseContent;