import React from 'react';
import './Metrics.css';
import './RegistrationForm.css'; // Import the CSS file
import LeftSideColumn from '../../components/LeftSideColumn/LeftSideColumn';
import { CustomTabList } from '../../components/CustomTabList/CustomTabList';
import Graphic from './Graphic';
import RegistrationForm from './RegistrationForm';
import EditDeleteMetric from './EditDeleteMetric'; // Corrigido o caminho de importação

const Metrics: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '250px' }}>
        <LeftSideColumn />
      </div>
      <div style={{ flex: 1 }}>
        <CustomTabList
          firstTabComponent={<Graphic />}
          secondTabComponent={<RegistrationForm />}
          thirdTabComponent={<EditDeleteMetric />}
        />
      </div>
    </div>
  );
};

export default Metrics;