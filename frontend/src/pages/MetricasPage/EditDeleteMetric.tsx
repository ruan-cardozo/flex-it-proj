import React, { useEffect, useState } from 'react';
import { getMetrics, updateMetric, deleteMetric } from '../../api/metrics';
import './EditDeleteMetric.css';

const EditDeleteMetric: React.FC = () => {
  const [metrics, setMetrics] = useState<{ id: number; data: string; peso: number; altura: number; imc: number }[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    data: "",
    peso: "",
    altura: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metrics = await getMetrics();
        setMetrics(metrics);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const metricId = parseInt(e.target.value);
    const metric = metrics.find(m => m.id === metricId);
    if (metric) {
      setSelectedMetric(metricId);
      setFormData({
        data: metric.data,
        peso: metric.peso.toString(),
        altura: metric.altura.toString(),
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMetric !== null) {
      try {
        await updateMetric(selectedMetric, {
          data: formData.data,
          peso: parseFloat(formData.peso),
          altura: parseFloat(formData.altura),
        });
        console.log("Dados atualizados:", formData);
        // Atualize a lista de métricas após a atualização
        const updatedMetrics = await getMetrics();
        setMetrics(updatedMetrics);
      } catch (error) {
        console.error("Erro ao atualizar dados:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedMetric !== null) {
      try {
        await deleteMetric(selectedMetric);
        console.log("Dados deletados:", selectedMetric);
        setMetrics(metrics.filter(m => m.id !== selectedMetric));
        setSelectedMetric(null);
        setFormData({
          data: "",
          peso: "",
          altura: "",
        });
      } catch (error) {
        console.error("Erro ao deletar dados:", error);
      }
    }
  };

  return (
    <div className="edit-delete-container">
      <h1>Editar ou Deletar Métrica</h1>
      <select onChange={handleSelectChange} value={selectedMetric || ""}>
        <option value="" disabled>Selecione uma métrica</option>
        {metrics.map(metric => (
          <option key={metric.id} value={metric.id}>
            {metric.data} - {metric.peso} kg - {metric.altura} cm
          </option>
        ))}
      </select>
      {selectedMetric !== null && (
        <form onSubmit={handleUpdate} className="form-container">
          <label className="form-label">
            Data:
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-label">
            Peso (kg):
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-label">
            Altura (cm):
            <input
              type="number"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <button type="submit" className="form-button">
            Atualizar
          </button>
          <button type="button" className="form-button delete-button" onClick={handleDelete}>
            Deletar
          </button>
        </form>
      )}
    </div>
  );
};

export default EditDeleteMetric;