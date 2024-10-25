import React, { useState } from 'react';
import { Calendar, ICalendarProps } from '@fluentui/react';
import './CustomCalendary.css'; // Importa o arquivo CSS

interface Treino {
  nome: string;
  data: string;
}

interface TreinoCalendarProps {
  treinos: Treino[];
}

const TreinoCalendar: React.FC<TreinoCalendarProps> = ({ treinos }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onDateSelect: ICalendarProps['onSelectDate'] = (date) => {
    setSelectedDate(date || null);
  };

  const isTrainingDay = (date: Date): boolean => {
    return treinos.some((treino) => {
      const treinoDate = new Date(treino.data);
      return (
        treinoDate.getDate() === date.getDate() &&
        treinoDate.getMonth() === date.getMonth() &&
        treinoDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const onRenderDate: ICalendarProps['onRenderDate'] = (date) => {
    const isTraining = isTrainingDay(date);
    return (
      <div
        style={{
          backgroundColor: isTraining ? '#FFDD57' : 'transparent',
          borderRadius: '50%',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {date.getDate()}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <Calendar
        onSelectDate={onDateSelect}
        dateRangeType={2}
        showGoToToday
        onRenderDate={onRenderDate}
        styles={{ root: { width: '100%', height: '600px' } }} // Aplica estilos diretamente ao componente Calendar
      />
      {selectedDate && (
        <div style={{ marginTop: '20px' }}>
          <h3>Treinos para {selectedDate.toLocaleDateString()}:</h3>
          {treinos
            .filter((treino) => {
              const treinoDate = new Date(treino.data);
              return treinoDate.toDateString() === selectedDate.toDateString();
            })
            .map((treino, index) => (
              <div key={index}>{treino.nome}</div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TreinoCalendar;