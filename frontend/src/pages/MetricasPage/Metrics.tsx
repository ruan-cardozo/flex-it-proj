// src/components/Metricas/Metrics.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './Metrics.css';
import LeftSideColumn from '../../components/LeftSideColumn/LeftSideColumn';
import { TabList } from '@fluentui/react-components'; // calma fdp eu vou usar isso ainda

const data = [
  { date: '2024-10-01', weight: 70 },
  { date: '2024-10-08', weight: 69.5 },
  { date: '2024-10-15', weight: 69 },
  { date: '2024-10-22', weight: 68.8 },
];

const Metrics = () => {
  return (
    <div style={{ display: 'flex' }}>
   <div style={{ width: '250px' }}> {/* Largura fixa para a coluna lateral */}
                <LeftSideColumn />
            </div>
    <div style={{ display: 'flex' }}>
              <TabList />
    </div> 
    <div className="metrics-container">
      <h1>Métricas Corporais</h1>
      
      <div className="metrics-cards">
        <div className="metric-card">
          <h2>Peso Atual</h2>
          <p>68.8 kg</p>
        </div>
        <div className="metric-card">
          <h2>IMC</h2>
          <p>22.3</p>
        </div>
        <div className="metric-card">
          <h2>Gordura Corporal</h2>
          <p>15%</p>
        </div>
      </div>

      <div className="metrics-chart">
        <h2>Progresso do Peso</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="metrics-history">
        <h2>Histórico de Pesagens</h2>
        <ul>
          {data.map((entry) => (
            <li key={entry.date}>
              {entry.date}: {entry.weight} kg
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Metrics;
