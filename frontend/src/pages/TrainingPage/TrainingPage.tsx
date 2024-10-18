import { useState } from "react";
// import TreinoCalendar from "../../components/CustomCalendary/CustomCalendary";
import { CustomCard } from "../../components/CustomCard/CustomCard";
import Header from "../../components/Header/Header";
import LeftSideColumn from "../../components/LeftSideColumn/LeftSideColumn";
import './css/TrainingPage.css';
import DialogForm from "../../components/DialogForm/DialogForm";
import CustomInput from "../../components/CustomInput/CustomInput";
// import CustomTextArea from "../../components/CustomTextArea/CustomTextArea";
import { makeStyles } from "@fluentui/react-components";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { Calendar } from "@fluentui/react";

// const treinos = [
//     { nome: 'Treino de Força', data: '2024-09-16' },
//     { nome: 'Treino Cardio', data: '2024-09-18' },
// ];

function TrainingPage() {
    const [isExerciseModalOpen, setExerciseIsModalOpen] = useState(false);
    const [isTrainingModalOpen, setTrainingIsModalOpen] = useState(false);

    const handleExerciseCardClick = () => {
        setExerciseIsModalOpen(true);
    };

    const handleCloseExerciseCardClick = () => {
        setExerciseIsModalOpen(false);
    };

    const handleTrainingCardClick = () => {
        setTrainingIsModalOpen(true);
    };

    const handleCloseTrainingCardClick = () => {
        setTrainingIsModalOpen(false);
    };

    return (
        <>
            <LeftSideColumn />
            <div className="training-page">
                <Header title="Bem vindo ao módulo de treinos!" />
                <p className="training-page-description">
                    O módulo de treinos permite criar, editar e imprimir treinos personalizados,
                    organizar por categorias e acompanhar tudo em um calendário interativo para melhor controle.
                </p>
                <div className="card-grid">
                    <CustomCard
                        onClick={handleExerciseCardClick}
                        cardTitle="Criar exercícios"
                        cardParagraph="Clique aqui para criar e personalizar um exercício adaptado às suas necessidades!"
                    />
                    <CustomCard
                        onClick={handleTrainingCardClick}
                        cardTitle="Criar treinos"
                        cardParagraph="Clique aqui para criar e personalizar um treino adaptado às suas necessidades!"
                    />
                    <CustomCard
                        onClick={() => console.log('Visualizar exercícios')}
                        cardTitle="Visualizar exercícios"
                        cardParagraph="Clique aqui para visualizar seus exercícios e realizar edições"
                    />
                    <CustomCard
                        onClick={() => console.log('Visualizar treinos')}
                        cardTitle="Visualizar treinos"
                        cardParagraph="Clique aqui para visualizar seus treinos, fazer edições rápidas e imprimir suas rotinas personalizadas!"
                    />
                    <Calendar />
                </div>
                {/* <div className="centered-container">
                    <Header style={{ margin: "0 auto", maxWidth: "800px", marginTop: "20px", padding: "20px" }} title="Calendário de treinos" />
                    <TreinoCalendar treinos={treinos} />
                </div> */}
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
        </>
    );
}

const useStylesTraining = makeStyles({
  dialogContentGrid: {
    display: "flex",
    flexWrap: "wrap",
    },
  customDropdown: {
    marginLeft: "10px",
  },
  customInput: {
    marginLeft: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    maxWidth: "200px",
  }
});

function DialogTrainingContent() {

  const style = useStylesTraining();
  const dropdownOptions = [
      "Treino cardiovascular",
      "Treino de definição",
      "Treino de força",
      "Treino funcional",
      "Treino HIIT",
      "Treino de hipertrofia",
      "Treino de resustência muscular",
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
  const dropdownOptions3 = [
      "Iniciante",
      "Intermediário",
      "Avançado"
  ];

  return (
      <div className={style.dialogContentGrid}>
          <CustomInput className={style.customInput} about="Nome do treino" />
          {/* <CustomTextArea about="Descrição do treino"/> */}
          <CustomDropdown className={style.customDropdown} dropdownOptions={dropdownOptions}  about="Selecione o objetivo do treino"/>
          <CustomDropdown className={style.customDropdown} dropdownOptions={dropdownOptions2}  about="Frequência Semanal"/>
          <CustomDropdown className={style.customDropdown} dropdownOptions={dropdownOptions3}  about="Dificuldade"/>
      </div>
  );
}

const useStylesExercise = makeStyles({
    dialogContentGrid: {
      display: "flex",
      flexWrap: "wrap",
      },
    customDropdown: {
      marginLeft: "10px",
    },
    customInput: {
      marginLeft: "10px",
    }
});

function DialogExerciseContent() {

    const style = useStylesExercise();

    return (
        <div className={style.dialogContentGrid}>
            
        </div>
    );
}
export default TrainingPage;