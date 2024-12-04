import { Card, Text, makeStyles } from '@fluentui/react-components';
import { DumbbellRegular, FoodAppleRegular, ArrowTrendingLinesRegular } from '@fluentui/react-icons';
import MonthlyCalendar from '../../components/MonthlyCalendar/MonthlyCalendar';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@fluentui/react';

const useStyles = makeStyles({
    card: {
      maxWidth: '100%',
      width: '100%',
      textAlign: 'center',
      height: '100%',
      cursor: 'pointer',
    },
    icon: {
      fontSize: '40px',
      color: '#0078d4',
    },
    largeIcon: {
      fontSize: '60px',
      color: '#0078d4',
      marginBottom: '10px',
    },
    stack: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px'
    },
    rowContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '38vh',
      width: '90vw',
      margin: '0 10px',
    },
    calendarCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      padding: 0,
    },
    calendarContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

const Home = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <Stack tokens={{ childrenGap: 20 }} horizontalAlign="space-between">
      <div className={styles.rowContainer}>
        <div className={styles.cardContainer}>
          <Card className={styles.card} onClick={() => navigate('/treinos')}>
            <DumbbellRegular className={styles.icon} />
            <Text size={500}>Treinos</Text>
            <Text size={400}>Acompanhe seus treinos no módulo de treinos.</Text>
          </Card>
        </div>
        <div className={styles.cardContainer}>
          <Card className={styles.card} onClick={() => navigate('/dietas')}>
            <FoodAppleRegular className={styles.icon} />
            <Text size={500}>Dietas</Text>
            <Text size={400}>Acompanhe suas dietas e refeições.</Text>
          </Card>
        </div>
      </div>
      <div className={styles.rowContainer}>
        <div className={styles.cardContainer}>
          <Card className={styles.card} onClick={() => navigate('/metricas')}>
            <ArrowTrendingLinesRegular className={styles.icon} />
            <Text size={500}>Métricas</Text>
            <Text size={400}>Veja suas métricas de desempenho.</Text>
          </Card>
        </div>
        <div className={styles.cardContainer}>
          <Card className={`${styles.card} ${styles.calendarCard}`}>
              <MonthlyCalendar width='100%' />
          </Card>
        </div>
      </div>
    </Stack>
  );
};

export default Home;