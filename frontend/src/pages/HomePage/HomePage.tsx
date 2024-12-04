import LeftSideColumn from "../../components/LeftSideColumn/LeftSideColumn";
import Home from "./HomeGrid";

function HomePage() {
    return (
        <div>
            <h1 style={{color: 'black', textAlign: 'center'}}>Seja bem vindo ao FlexIt</h1>
            <p style={{marginLeft: '250px', padding: '20px'}}> 
            O FlexIt é a sua plataforma definitiva para gerenciar e acompanhar suas rotinas de treinos, dietas e métricas de desempenho. 
            Com o FlexIt, você tem todas as ferramentas necessárias para controlar sua saúde e bem-estar em um único lugar. 
            Alcance seus objetivos de forma organizada e eficiente, mantendo-se no caminho certo para uma vida mais saudável.
            </p>
            <LeftSideColumn />
            <div style={{
                marginLeft: '250px',
                padding: '10px',
            }}>
                <Home />
            </div>
        </div>
    );
}

export default HomePage;