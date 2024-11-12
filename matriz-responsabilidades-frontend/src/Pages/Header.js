// Components/Header.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledHeader = styled(AppBar)({
  backgroundColor: '#4CAF50',
  padding: '10px 0',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

const Header = () => (
  <StyledHeader position="static">
    <Toolbar sx={{ justifyContent: 'center' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{
          color: 'white', 
          fontWeight: 'bold', 
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        }}
      >
        Gestión de Proyectos
      </Typography>
    </Toolbar>
  </StyledHeader>
);

export default Header;
