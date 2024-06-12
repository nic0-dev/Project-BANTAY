import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './components/NavBar';
import Cards from './components/Cards';
import Table from './components/Table'
import Charts from './components/Charts'
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';


export default function LandingPage() {
  const [mode, setMode] = React.useState('dark');
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <NavBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Cards />
        <Table />
        <Charts />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}