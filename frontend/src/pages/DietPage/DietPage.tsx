import React, { useState } from 'react';
import './DietPage.css';
import LeftSideColumn from '../../components/LeftSideColumn/LeftSideColumn';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Refeicoes {
  [key: string]: string[];
}

interface NovosItens {
  [key: string]: string;
}

const DietPage: React.FC = () => {
  const [refeicoes, setRefeicoes] = useState<Refeicoes>({
    "Café da Manhã": ["Ovos mexidos com pão integral"],
    Almoço: ["Peito de frango com batata doce"],
    Jantar: ["Salada com atum"],
    Lanches: [],
  });

  const [novosItens, setNovosItens] = useState<NovosItens>({
    "Café da Manhã": "",
    Almoço: "",
    Jantar: "",
    Lanches: "",
  });

  const [calorias, setCalorias] = useState(0);
  const [hidratacao, setHidratacao] = useState(0);

  const [caloriasMeta, setCaloriasMeta] = useState(2000);
  const [hidratacaoMeta, setHidratacaoMeta] = useState(3000);

  const handleAdicionarItem = (refeicao: string) => {
    if (novosItens[refeicao].trim() !== "") {
      setRefeicoes((prevRefeicoes) => ({
        ...prevRefeicoes,
        [refeicao]: [...prevRefeicoes[refeicao], novosItens[refeicao]],
      }));
      setNovosItens((prevItens) => ({
        ...prevItens,
        [refeicao]: "",
      }));
    }
  };

  const handleInputChange = (refeicao: string, value: string) => {
    setNovosItens((prevItens) => ({
      ...prevItens,
      [refeicao]: value,
    }));
  };

  const handleCaloriasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalorias(Math.min(Number(e.target.value), caloriasMeta));
  };

  const handleHidratacaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHidratacao(Math.min(Number(e.target.value), hidratacaoMeta));
  };

  return (
    <div className="diet-app">
      <LeftSideColumn />
      <div className="diet-content">
        <div className="header-container">
          <h1>Bem-vindo ao módulo de Gerenciamento de Dietas</h1>
          <p className="page-description">
            Neste módulo, você pode gerenciar suas refeições diárias, adicionar itens para o café da manhã, almoço, jantar e lanches.
          </p>
        </div>
        
        <div className="main-content">
          <div className="diet-cards">
            {Object.keys(refeicoes).map((refeicao) => (
              <div className="diet-card" key={refeicao}>
                <h3>{refeicao}</h3>
                <ul>
                  {refeicoes[refeicao].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <input
                  type="text"
                  placeholder="Adicionar item"
                  value={novosItens[refeicao]}
                  onChange={(e) => handleInputChange(refeicao, e.target.value)}
                  className="input-item"
                />
                <button onClick={() => handleAdicionarItem(refeicao)} className="add-button">
                  Adicionar
                </button>
              </div>
            ))}
          </div>

          {/* Barra de Metas Diárias */}
          <div className="goal-section">
            <h3>Calorias Consumidas</h3>
            <div className="goal-meta-container">
              <span className="goal-meta-label">Meta:</span>
              <input
                type="number"
                value={caloriasMeta}
                onChange={(e) => setCaloriasMeta(Number(e.target.value))}
                className="goal-meta-input"
                placeholder="Definir meta de calorias"
              />
            </div>
            <div className="goal-bar">
              <div
                className="goal-bar-progress"
                style={{ width: `${(calorias / caloriasMeta) * 100}%` }}
              />
            </div>
            <input
              type="number"
              value={calorias}
              onChange={handleCaloriasChange}
              className="goal-input"
              min="0"
              max={caloriasMeta}
            />
            <span>{calorias} / {caloriasMeta} kcal</span>

            <h3>Hidratação (ml)</h3>
            <div className="goal-meta-container">
              <span className="goal-meta-label">Meta:</span>
              <input
                type="number"
                value={hidratacaoMeta}
                onChange={(e) => setHidratacaoMeta(Number(e.target.value))}
                className="goal-meta-input"
                placeholder="Definir meta de hidratação"
              />
            </div>
            <div className="goal-bar">
              <div
                className="goal-bar-progress"
                style={{ width: `${(hidratacao / hidratacaoMeta) * 100}%` }}
              />
            </div>
            <input
              type="number"
              value={hidratacao}
              onChange={handleHidratacaoChange}
              className="goal-input"
              min="0"
              max={hidratacaoMeta}
            />
            <span>{hidratacao} / {hidratacaoMeta} ml</span>
          </div>

          {/* Calendário ao lado direito */}
          <div className="calendar-section">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPage;
