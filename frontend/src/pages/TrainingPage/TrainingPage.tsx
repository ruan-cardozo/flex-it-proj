import { useState } from "react";
import { CustomCard } from "../../components/CustomCard/CustomCard";
import Header from "../../components/Header/Header";
import LeftSideColumn from "../../components/LeftSideColumn/LeftSideColumn";
import './style/TrainingPage.css';
import DialogForm from "../../components/DialogForm/DialogForm";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { Calendar } from "@fluentui/react"; 
import { useStylesCustomCard, useStylesExercise, useStylesTraining } from "./style/TrainingPage.const";
import { DateInput } from "../../components/DateInput/DateInput";
import CustomSpinButton from "../../components/SpinButton/SpinButton";

export default function TrainingPage() {

    return (
        <>
            <LeftSideColumn />
            <div className="training-page">
                <Header style={{textAlign: 'left'}} title="Bem vindo ao módulo de treinos!" />
                <PageParagraph />
                <CustomGridArea />
            </div>
        </>
    );
}

function DialogTrainingContent() {

  const style = useStylesTraining();
  const dropdownOptions = [
      "Treino cardiovascular",
      "Treino de definição",
      "Treino de força",
      "Treino funcional",
      "Treino HIIT",
      "Treino de hipertrofia",
      "Treino de resistência muscular",
      "Treino terapêutico"
  ];
  const dropdownOptions2 = [
      "1x por semana",
      "2x por semana",
      "3x por semana",
      "4x por semana",
      "5x por semana",
      "6x por semana",
      "7x por semana"
  ];

  return (
      <div className={style.dialogContentGrid}>
          <CustomInput className={style.customInput} about="Nome do treino" />
          <CustomDropdown className={style.customDropdown} dropdownOptions={dropdownOptions}  about="Selecione o objetivo do treino"/>
          <CustomDropdown className={style.customDropdown} dropdownOptions={dropdownOptions2}  about="Frequência Semanal"/>
          <DateInput about="Data de inicio" className={style.dateInput}/>
          <DateInput about="Data de término" className={style.dateInput}/>
          <CustomInput className={style.customInput} about="Equipamentos necessários" />
      </div>
  );
}

function DialogExerciseContent() {

    const style = useStylesExercise();

    const dropdownOptions2 = [
        "Peito",
        "Pernas",
        "Costas",
        "Ombros",
        "Bíceps",
        "Tríceps",
        "Abdômen",
        "Glúteos",
        "Panturrilha",
        "Trapézio",
        "Antebraço",
        "Quadríceps"
    ];

    const dropdownOptionsRest = [
        "30 s",
        "1min",
        "1min 30s",
        "2min",
        "2min 30s",
        "3min",
        "3min 30s",
        "4min",
        "4min 30s",
        "5min",
        "5min 30s",
        "6min"
    ];

    return (
        <div className={style.dialogContentGrid}>
          <CustomInput className={style.customInput} about="Nome do exercício" />
          <CustomSpinButton className={style.customSpinButton} applyFormatter={false} about="Reps"/>
          <CustomSpinButton about="Série"/>
          <CustomSpinButton applyFormatter={true} about="Peso"/>
          <CustomDropdown className={style.customDropdown} dropdownOptions={dropdownOptions2}  about="Selecione o objetivo do treino"/>
          <CustomDropdown className={style.customDropdown} dropdownOptions={dropdownOptionsRest}  about="Selecione o tempo de descanso"/>
          <CustomInput className={style.customInput} about="Observação" />
        </div>
    );
}

function CustomGridArea() {

    const [isExerciseModalOpen, setExerciseIsModalOpen] = useState(false);
    const [isTrainingModalOpen, setTrainingIsModalOpen] = useState(false);
    const customCardStyle = useStylesCustomCard();
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
        <div className="card-grid">
            <CustomCard
                className={customCardStyle.main}
                onClick={handleExerciseCardClick}
                cardTitle="Criar exercícios"
                cardParagraph="Clique aqui para criar e personalizar um exercício adaptado às suas necessidades!"
            />
            <CustomCard
                className={customCardStyle.main}
                onClick={handleTrainingCardClick}
                cardTitle="Criar treinos"
                cardParagraph="Clique aqui para criar e personalizar um treino adaptado às suas necessidades!"
            />
            <CustomCard
                className={customCardStyle.main}
                onClick={() => console.log('Visualizar exercícios')}
                cardTitle="Visualizar exercícios"
                cardParagraph="Clique aqui para visualizar seus exercícios e realizar edições"
            />
            <CustomCard
                className={customCardStyle.main}
                onClick={() => console.log('Visualizar treinos')}
                cardTitle="Visualizar treinos"
                cardParagraph="Clique aqui para visualizar seus treinos, fazer edições rápidas e imprimir suas rotinas personalizadas!"
            />        
            <Calendar />
            <DialogForm
               dialogContent={<DialogTrainingContent/>}
               formTitle="Criar treino"
               isOpen={isTrainingModalOpen}
               onClose={handleCloseTrainingCardClick}
           />
           <DialogForm
               dialogContent={<DialogExerciseContent/>}
               formTitle="Criar exercícios"
               isOpen={isExerciseModalOpen}
               onClose={handleCloseExerciseCardClick}
           />
        </div>   
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