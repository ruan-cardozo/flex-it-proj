import React from 'react';
import { useStylesTraining } from '../style/TrainingPage.const';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomDropdown from '../../../components/CustomDropdown/CustomDropdown';
import { DateInput } from '../../../components/DateInput/DateInput';

const DialogTrainingContent: React.FC = () => {
    const style = useStylesTraining();
    const dropdownOptions = [
        "Treino cardiovascular", "Treino de definição", "Treino de força", "Treino funcional", "Treino HIIT", "Treino de hipertrofia", "Treino de resistência muscular", "Treino terapêutico"
    ];
    const dropdownOptions2 = [
        "1x por semana", "2x por semana", "3x por semana", "4x por semana", "5x por semana", "6x por semana", "7x por semana"
    ];

    return (
        <div className={style.dialogContentGrid}>
            <CustomInput className={style.customInput} about="Nome do treino" />
            <CustomDropdown className={style.customDropdown} dropdownOptions={dropdownOptions} about="Selecione o objetivo do treino" />
            <CustomDropdown className={style.customDropdown} dropdownOptions={dropdownOptions2} about="Frequência Semanal" />
            <DateInput about="Data de inicio" className={style.dateInput} />
            <DateInput about="Data de término" className={style.dateInput} />
            <CustomInput className={style.customInput} about="Equipamentos necessários" />
        </div>
    );
};

export default DialogTrainingContent;