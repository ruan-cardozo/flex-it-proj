import { useEffect, useState } from "react";
import { Frequency, getTrainings, TrainingObjective } from "../../../api/training";
import { createTableColumn, TableColumnDefinition } from "@fluentui/react-components";
import LeftSideColumn from "../../../components/LeftSideColumn/LeftSideColumn";
import Header from "../../../components/Header/Header";
import CustomDataGrid from "../../../components/CustomDataGrid/CustomDataGrid";

type Training = {
    name: string,
    training_objective: TrainingObjective,
    weekly_frequency: Frequency,
    start_date: Date,
    end_date: Date,
    necessary_equipment: string,
    exercise_ids?: Array<number>
}

async function getUserTraining() {
    const trainings = await getTrainings();
    return trainings.map((training: Training) => ({
        name: training.name,
        training_objective: training.training_objective,
        weekly_frequency: training.weekly_frequency,
        start_date: training.start_date,
        end_date: training.end_date,
        necessary_equipment: training.necessary_equipment
    }));
}

export default function TraingingPageView() {
    const [items, setItems] = useState<Training[]>([]);

    useEffect(() => {
        async function fetchTraining() {
            const trainings = await getUserTraining();
            setItems(trainings);
        }
        fetchTraining();
    }, []);

    // Definir colunas com as ações na última coluna
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    };

    const columns: TableColumnDefinition<Training>[] = [
        createTableColumn<Training>({
            columnId: 'name',
            compare: (a, b) => (a.name || "").localeCompare(b.name || ""),
            renderHeaderCell: () => 'Nome',
            renderCell: (item) => item.name || 'N/A',
        }),
        createTableColumn<Training>({
            columnId: 'training_objective',
            compare: (a, b) => (a.training_objective || "").localeCompare(b.training_objective || ""),
            renderHeaderCell: () => 'Objetivo do treino',
            renderCell: (item) => item.training_objective || 'N/A',
        }),
        createTableColumn<Training>({
            columnId: 'start_date',
            compare: (a, b) => (a.start_date.toString() || "").localeCompare(b.start_date.toString() || ""),
            renderHeaderCell: () => 'Data de início',
            renderCell: (item) => formatDate(item.start_date) || 'N/A',
        }),
        createTableColumn<Training>({
            columnId: 'end_date',
            compare: (a, b) => (a.end_date.toString() || "").localeCompare(b.end_date.toString() || ""),
            renderHeaderCell: () => 'Data de término',
            renderCell: (item) => formatDate(item.end_date) || 'N/A',
        }),
        createTableColumn<Training>({
            columnId: 'weekly_frequency',
            compare: (a, b) => (a.weekly_frequency || "").localeCompare(b.weekly_frequency || ""),
            renderHeaderCell: () => 'Frequência semanal',
            renderCell: (item) => item.weekly_frequency || 'N/A',
        }),
        createTableColumn<Training>({
            columnId: 'necessary_equipment',
            compare: (a, b) => (a.necessary_equipment || "").localeCompare(b.necessary_equipment || ""),
            renderHeaderCell: () => 'Equipamentos',
            renderCell: (item) => item.necessary_equipment || 'N/A',
        })
    ];

    // Handlers para ações
    const handleOpen = (item: Training) => {
        console.log('Abrir exercício:', item);
    };

    const handleEdit = (item: Training) => {
        console.log('Editar exercício:', item);
    };

    const handleDelete = (item: Training) => {
        console.log('Deletar exercício:', item);
    };

    return (
        <>
            <LeftSideColumn />
            <div style={{ marginLeft: '300px' }}>
                <Header title="Bem-vindo ao módulo de treinos!" />
                <PageParagraph />
                <CustomDataGrid 
                    items={items}
                    columns={columns}
                    onOpenItem={handleOpen}
                    onEditItem={handleEdit}
                    onDeleteItem={handleDelete}
                />
            </div>
        </>
    );
}

function PageParagraph() {
    return (
        <p>
            Neste módulo você pode visualizar os treinos que foram criados. 
            Caso deseje visualizar os exercícios que compõem um treino, clique no botão "Visualizar exercícios".
        </p>
    );
}