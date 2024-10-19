import React from 'react';
import './DietPage.css';
import LeftSideColumn from '../../components/LeftSideColumn/LeftSideColumn';

const DietPage: React.FC = () => {
  return (
    <div className="diet-app">
      <LeftSideColumn />
      <div className="diet-content">
        <h1>Gerenciamento de Dieta</h1>
        <div className="diet-cards">
          <div className="diet-card">
            <h3>Café da Manhã</h3>
            <p>Descrição: Ovos mexidos com pão integral</p>
            <p>Calorias: 350 kcal</p>
          </div>
          <div className="diet-card">
            <h3>Almoço</h3>
            <p>Descrição: Peito de frango com batata doce</p>
            <p>Calorias: 450 kcal</p>
          </div>
          <div className="diet-card">
            <h3>Jantar</h3>
            <p>Descrição: Salada com atum</p>
            <p>Calorias: 300 kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPage;