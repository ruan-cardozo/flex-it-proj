import React, { useState } from 'react';
import { createMetric } from '../../api/metrics';
import './RegistrationForm.css';
import { useToast } from '../../context/ToastContext';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    data: "",
    peso: "",
    altura: "",
  });
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
  
      const formattedDate = new Date(formData.data);
      const response = await createMetric({
        data: formattedDate,
        peso: parseFloat(formData.peso),
        altura: parseFloat(formData.altura),
      });
      if(response) {
        showToast("Métrica cadastrado com sucesso!", "success");
      }
      console.log("Dados cadastrados:", formData);
    } catch (error) {
      showToast("Houve um erro ao cadastrar a métrica!", "success");
      console.error("Erro ao cadastrar dados:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Cadastre seus dados</h1>
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