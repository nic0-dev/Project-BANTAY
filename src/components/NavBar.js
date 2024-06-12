import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import logo from './logo.png';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';


function AppAppBar({ mode, toggleColorMode }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
    <div>
      <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2, }}>
        <Container maxWidth="lg">
            <Toolbar variant="regular" sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                borderRadius: '999px',
                bgcolor:
                theme.palette.mode === 'light'
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(24px)',
                maxHeight: 40,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow:
                theme.palette.mode === 'light'
                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                })}
            >
            {/* Dashboard Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', color: isDarkMode ? '#ffffff' : '#000000' }}>
                <SpaceDashboardIcon />
                <Typography varient="h6" fontWeight='bold'>Dashboard</Typography>
            </Box>

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Project Name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', color: isDarkMode ? '#ffffff' : '#000000', textAlign: 'center', flexGrow: 1, justifyContent: 'center' }}>
                <Box component="img" src={logo} alt="Logo" sx={{ height: 40 }} />
                <Typography variant="h5" fontWeight='bold'>PROJECT BANTAY</Typography>
            </Box>

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Theme and User Icons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center', color: isDarkMode ? '#ffffff' : '#000000' }}>
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button variant="text" color="primary" aria-label="menu" onClick={toggleDrawer(true)} sx={{ minWidth: '30px', p: '4px' }}>
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ minWidth: '60dvw', p: 2, backgroundColor: 'background.paper', flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexGrow: 1 }}>
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  Account 1
                  <Divider />
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;