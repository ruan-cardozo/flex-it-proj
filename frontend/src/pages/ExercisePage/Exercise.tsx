import { useEffect, useState } from 'react';
import { getExercises, MuscleGroup, RestTime } from "../../api/exercise";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import Header from "../../components/Header/Header";
import LeftSideColumn from "../../components/LeftSideColumn/LeftSideColumn";
import { createTableColumn, selectClassNames, TableColumnDefinition } from "@fluentui/react-components";
import DialogForm from '../../components/DialogForm/DialogForm';
import DialogExerciseContent from '../TrainingPage/Dialogs/DialogExerciseContent';

// Definição do tipo "Exercise"
type Exercise = {
    name?: string;
    muscle_group?: MuscleGroup | string;
    series?: number;
    repetitions?: number;
    exercise_weight?: number;
    rest_time?: RestTime | string;
    observation?: string;
};

// Função para buscar exercícios do usuário
async function getUserExercises() {
    const exercises = await getExercises();
    return exercises.map((exercise: Exercise) => ({
        name: exercise.name,
        muscle_group: exercise.muscle_group,
        observation: exercise.observation
    }));
}

export default function Exercise() {
    const [items, setItems] = useState<Exercise[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>(undefined);
    const [isTrainingModalOpen, setTrainingIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchExercises() {
            const exercises = await getUserExercises();
            setItems(exercises);
        }
        fetchExercises();
    }, []);

    // Definir colunas com as ações na última coluna
    const columns: TableColumnDefinition<Exercise>[] = [
        createTableColumn<Exercise>({
            columnId: 'name',
            compare: (a, b) => (a.name || "").localeCompare(b.name || ""),
            renderHeaderCell: () => 'Nome',
            renderCell: (item) => item.name || 'N/A',
        }),
        createTableColumn<Exercise>({
            columnId: 'muscle_group',
            compare: (a, b) => (a.muscle_group || "").localeCompare(b.muscle_group || ""),
            renderHeaderCell: () => 'Grupo Muscular',
            renderCell: (item) => item.muscle_group || 'N/A',
        }),
        createTableColumn<Exercise>({
            columnId: 'observation',
            compare: (a, b) => (a.observation || "").localeCompare(b.observation || ""),
            renderHeaderCell: () => 'Observação',
            renderCell: (item) => item.observation || 'N/A',
        })
    ];

    // Handlers para ações
    const handleOpen = (item: Exercise) => {
        console.log('Abrir exercício:', item);
    };

    const handleEdit = (item: Exercise) => {
        setTrainingIsModalOpen(true);
    };

    const handleDelete = (item: Exercise) => {
        console.log('Deletar exercício:', item);
    };

    const handleCloseTrainingCardClick = () => {
        setTrainingIsModalOpen(false);
    }

    return (
        <>
            <LeftSideColumn />
            <div style={{ marginLeft: '300px' }}>
                <Header title="Bem-vindo ao módulo de exercícios!" />
                <PageParagraph />
                <CustomDataGrid 
                    items={items}
                    columns={columns}
                    onOpenItem={handleOpen}
                    onEditItem={handleEdit}
                    onDeleteItem={handleDelete}
                />
                <DialogForm
                    dialogContent={<DialogExerciseContent exercise={selectedExercise} />}
                    formTitle="Editar exercício"
                    isOpen={isTrainingModalOpen}
                    onClose={handleCloseTrainingCardClick}
            />
            </div>
        </>
    );
}

// Função de parágrafo de introdução
function PageParagraph() {
    return (
        <p style={{ textAlign: 'center', color: 'black', fontSize: '20px' }}>
            Aqui você poderá editar, excluir e visualizar os exercícios.
        </p>
    );
}
