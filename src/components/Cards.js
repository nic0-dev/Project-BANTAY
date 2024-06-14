import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PeopleIcon from '@mui/icons-material/People';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import { useTheme } from '@mui/material/styles';

import { ref, onValue } from 'firebase/database';
import database from '../firebaseConfig';

export default function Cards() {

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const getPaperBackground = () => {
    return isDarkMode
      ? 'linear-gradient(45deg, #111719 0%, #090E10 100%)'
      : 'linear-gradient(45deg, #ffffff 0%, #eeeeee 100%)';
  };

  const [currentData, setCurrentData] = React.useState({
    peopleInside: 0,
    userId: '',
    temperature: 0,
    direction: '',
    lastUpdated: ''
  });

  React.useEffect(() => {
    const dataRef = ref(database, 'sensorData');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sortedData = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => b.id - a.id);
        const mostRecent = sortedData[0];

        const peopleInside = sortedData.reduce((count, entry) => {
          return entry.Direction === 'ENTER' ? count + 1 : count - 1;
        }, 0);

        setCurrentData({
          peopleInside,
          userId: mostRecent.RFID,
          temperature: mostRecent.Temperature,
          direction: mostRecent.Direction,
          lastUpdated: formatTimestamp(mostRecent.id)
        });
      }
    });
  }, []);

  const formatTimestamp = (timestamp) => {
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    const hour = timestamp.substring(8, 10);
    const minute = timestamp.substring(10, 12);
    const second = timestamp.substring(12, 14);
    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    return date.toLocaleString();
  };

  return (
    <Box component="section" sx={{mt: {xs: 10, md: 15}}} py={2}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 4 }}>
        <Box sx={{ display: 'flex', mb: 2, alignItems: 'center'}}>
          <Box sx={{mr: 2}}><Typography variant="h5" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }}}>Current Reading: </Typography></Box>
          <Typography color='#918E97' variant="body1" sx={{ fontSize: { xs: '0.6rem', sm: '1rem' }}}>(Last Updated: {currentData.lastUpdated})</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }}}>
          <Paper  sx={{ flex: '1 1 25%', p: 2, background: 'linear-gradient(135deg, #ec765b 0%, #E84420 100%)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, backgroundColor: 'black', borderRadius: 2, mb: 1 }}>
              <PeopleIcon fontSize="large" />
            </Box>
            <Typography>No. of People Inside</Typography>
            <Typography variant="h4">{currentData.peopleInside}</Typography>
          </Paper>

          <Paper sx={{ flex: '1 1 25%', p: 2, background: getPaperBackground(), border: '1px solid', borderColor: 'divider', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, backgroundColor: '#1c2529', borderRadius: 2, mb: 1 }}>
              <CreditCardIcon fontSize="large" />
            </Box>
            <Box sx={{color: isDarkMode ? '#ffffff' : '#000000'}}>
              <Typography>User ID</Typography>
              <Typography variant="h4">{currentData.userId}</Typography>
            </Box>
          </Paper>

          <Paper sx={{ flex: '1 1 25%', p: 2, background: getPaperBackground(), border: '1px solid', borderColor: 'divider', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, backgroundColor: '#1c2529', borderRadius: 2, mb: 1 }}>
              <ThermostatIcon fontSize="large" />
            </Box >
            <Box sx={{color: isDarkMode ? '#ffffff' : '#000000'}}>
              <Typography>Body Temperature</Typography>
              <Typography variant="h4">{currentData.temperature} °C</Typography>
            </Box>
          </Paper>

          <Paper sx={{ flex: '1 1 25%', p: 2, background: getPaperBackground(), border: '1px solid', borderColor: 'divider', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, backgroundColor: '#1c2529', borderRadius: 2, mb: 1 }}>
              <CompareArrowsRoundedIcon fontSize="large" />
            </Box>
            <Box sx={{color: isDarkMode ? '#ffffff' : '#000000'}}>
              <Typography>Direction</Typography>
              <Typography variant="h4">{currentData.direction}</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
