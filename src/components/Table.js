import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ref, onValue } from 'firebase/database';
import database from '../firebaseConfig';

export default function DisplayTable() {
  const [sensorData, setSensorData] = React.useState([]);

  React.useEffect(() => {
    const dataRef = ref(database, 'sensorData');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert data object to an array and sort it by timestamp
        const sortedData = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => b.id - a.id);
        setSensorData(sortedData);
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
    <Box component="section" py={2}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 4 }}>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Typography variant="h5">User Data: </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table sx={{ minWidth: 650 }} aria-label="sensor data table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left">UID</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Temperature (°C)</TableCell>
                <TableCell align="left">Direction</TableCell>
                <TableCell align="left">Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sensorData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.RFID}</TableCell>
                  <TableCell align="left">{''}</TableCell>
                  <TableCell align="left">{row.Temperature}</TableCell>
                  <TableCell align="left">{row.Direction}</TableCell>
                  <TableCell align="left">{formatTimestamp(row.id)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}