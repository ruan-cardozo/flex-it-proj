import { useState } from "react";
import { CustomCard } from "../../components/CustomCard/CustomCard";
import Header from "../../components/Header/Header";
import LeftSideColumn from "../../components/LeftSideColumn/LeftSideColumn";
import './style/TrainingPage.css';
import DialogForm from "../../components/DialogForm/DialogForm";
import { useStylesCustomCard } from "./style/TrainingPage.const";
import DialogTrainingContent from "./Dialogs/DialogTrainingContent";
import DialogExerciseContent from "./Dialogs/DialogExerciseContent";
import { useNavigate } from "react-router-dom";

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

function PageParagraph() {
    return (
        <p className="training-page-description">
            O módulo de treinos permite criar, editar e imprimir treinos personalizados,
            organizar por categorias e acompanhar tudo em um calendário interativo para melhor controle.
        </p>
    );
}