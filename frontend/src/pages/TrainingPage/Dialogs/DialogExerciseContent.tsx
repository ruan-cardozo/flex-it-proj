import { useState } from "react";
import { useStylesExercise } from "../style/TrainingPage.const";
import { createExercise, MuscleGroup, RestTime } from "../../../api/exercise";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomSpinButton from "../../../components/SpinButton/SpinButton";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import { Button } from "@fluentui/react-components";
import { SaveFilled } from "@fluentui/react-icons";


const DialogExerciseContent: React.FC = () => {
    const style = useStylesExercise();
    const [exercise, setExercise] = useState({
        name: '',
        muscle_group: MuscleGroup.Peito,
        series: 0,
        repetitions: 0,
        exercise_weight: 0,
        rest_time: RestTime.ThirdySeconds,
        observation: ''
    });

    const dropdownOptions2 = [
        "Peito", "Pernas", "Costas", "Ombros", "Bíceps", "Tríceps", "Abdômen", "Glúteos", "Panturrilha", "Trapézio", "Antebraço", "Quadríceps"
    ];
    const dropdownOptionsRest = [
        "30 s", "1min", "1min 30s", "2min", "2min 30s", "3min", "3min 30s", "4min", "4min 30s", "5min", "5min 30s", "6min"
    ];

    const handleInputChange = (field: string, value: any) => {

        setExercise(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSaveExercise = async () => {
        try {
            await createExercise(exercise);
        } catch (error) {
            console.error("Failed to save exercise", error);
        }
    };

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