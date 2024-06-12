import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { ref, onValue } from 'firebase/database';
import database from '../firebaseConfig';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

export default function Charts() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [temperatureData, setTemperatureData] = React.useState([]);
  const [scanData, setScanData] = React.useState([]);

  React.useEffect(() => {
    const dataRef = ref(database, 'sensorData');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sortedData = Object.entries(data).map(([id, value]) => ({ id, ...value }));

        const temperatures = sortedData.map(entry => ({
          x: new Date(
            entry.id.substring(0, 4), 
            entry.id.substring(4, 6) - 1, 
            entry.id.substring(6, 8), 
            entry.id.substring(8, 10), 
            entry.id.substring(10, 12), 
            entry.id.substring(12, 14)
          ),
          y: parseFloat(entry.Temperature)
        }));

        const scans = sortedData.reduce((acc, entry) => {
          const hour = entry.id.substring(8, 10);
          acc[hour] = (acc[hour] || 0) + 1;
          return acc;
        }, {});

        const scanData = Object.keys(scans).map(hour => ({
          x: `${hour}:00`,
          y: scans[hour]
        }));

        setTemperatureData(temperatures);
        setScanData(scanData);
      }
    });
  }, []);

  const lineChartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          tooltipFormat: 'dd/MM/yyyy HH:mm',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)'
        },
      },
    },
  };

  const barChartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hour'
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Scans'
        },
      },
    },
  };

  const getPaperBackground = () => {
    return isDarkMode
      ? 'linear-gradient(45deg, #111719 0%, #090E10 50%)'
      : 'linear-gradient(45deg, #ffffff 0%, #eeeeee 100%)';
  };

  return (
    <Box component="section" py={2}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' }  // Stack vertically on xs screens, row on sm and larger
        }}>
          <Box sx={{ flex: '1 1 50%', p: 2, background: getPaperBackground(), borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: { xs: 2, sm: 0 } }}>
            <Typography variant="h6" mb={2}>Body Temperature</Typography>
            <Line data={{ datasets: [{ label: 'Body Temperature', data: temperatureData, fill: false, borderColor: '#E84420' }] }} options={lineChartOptions} />
          </Box>
          <Box sx={{ flex: '1 1 50%', p: 2, background: getPaperBackground(), borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" mb={2}>Total Scans per 4h</Typography>
            <Bar data={{ datasets: [{ label: 'Number of Scans', data: scanData, backgroundColor: '#5f4dff' }] }} options={barChartOptions} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
