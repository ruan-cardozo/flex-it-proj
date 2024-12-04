import React, { useState } from 'react';
import { createMetric } from '../../api/metrics';
import { format } from 'date-fns';
import './RegistrationForm.css';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    data: "",
    peso: "",
    altura: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedDate = format(new Date(formData.data), 'yyyy-MM-dd');
      await createMetric({
        data: formattedDate,
        peso: parseFloat(formData.peso),
        altura: parseFloat(formData.altura),
      });
      console.log("Dados cadastrados:", formData);
    } catch (error) {
      console.error("Erro ao cadastrar dados:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Form</h1>
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
        Cadastrar
      </button>
    </form>
  );
};

export default RegistrationForm;