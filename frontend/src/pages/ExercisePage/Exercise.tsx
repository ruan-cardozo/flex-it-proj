import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import Header from "../../components/Header/Header";
import LeftSideColumn from "../../components/LeftSideColumn/LeftSideColumn";

export default function Exercise() {
    return (
        <>
            <LeftSideColumn />
            <div style={{
                marginLeft: '300px',
            }}>
                <Header 
                    style={{}}
                    title="Bem vindo ao módulo de exercícios!"
                />
                <PageParagraph />
                <CustomDataGrid />
            </div>
        </>
    );
}

function PageParagraph() {
    return (
        <p style={{textAlign: 'center', color: 'black', fontSize: '20px'}}>
            Aqui você poderá editar, excluir e imprimir exercícios.
        </p>
    );
}