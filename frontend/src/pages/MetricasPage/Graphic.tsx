import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { getMetrics } from '../../api/metrics';
import { format, addDays } from 'date-fns';
import './Metrics.css';

const Graphic: React.FC = () => {
  const [data, setData] = useState<{ data: Date; peso: number; altura: number; imc: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metrics = await getMetrics();
        const calculatedData = metrics.map((metric: { data: string; peso: number; altura: number }) => ({
          ...metric,
          data: addDays(new Date(metric.data), 1), // Adiciona um dia à data
          imc: metric.peso / ((metric.altura / 100) ** 2),
        }));
        setData(calculatedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="metrics-container">
      <h1>Métricas Corporais</h1>
      <div className="metrics-cards">
        {data.length > 0 && (
          <>
            <div className="metric-card">
              <h2>Peso Atual</h2>
              <p>{data[data.length - 1].peso} kg</p>
            </div>
            <div className="metric-card">
              <h2>IMC</h2>
              <p>{data[data.length - 1].imc.toFixed(1)}</p>
            </div>
          </>
        )}
      </div>
      <div className="metrics-chart">
        <h2>Progresso do Peso</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="peso" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="metrics-history">
        <h2>Histórico de Pesagens</h2>
        <ul>
          {data.map((entry) => (
            <li key={entry.data.toString()}>
              {format(new Date(entry.data), 'dd/MM/yyyy')}: {entry.peso} kg
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Graphic;