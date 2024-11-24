// Pages/Footer.js
import React from 'react';
import { Box, Typography, IconButton, Container, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)({
  backgroundColor: '#333',
  color: 'white',
  padding: '20px 0',
  textAlign: 'center',
});

const Footer = () => (
  <FooterContainer component="footer">
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
        <img
          src="https://www.et37ba.edu.ar/images/logo-default-223x188.png" // URL del logo de Hogar Naval Stella Maris
          alt="Logo Hogar Naval Stella Maris"
          style={{ borderRadius: '50%', width: 50, height: 50 }}
        />
        <img
          src="https://trabajo.buenosaires.gob.ar/uploads/logos/759da262af9c7754f0575b390f371459.jpeg" // URL de la imagen de Streambe
          alt="Streambe Logo"
          style={{ borderRadius: '50%', width: 50, height: 50 }}
        />
      </Box>

      <Divider sx={{ bgcolor: 'gray', mb: 2 }} />

      <Typography variant="body2" gutterBottom>
        © 2024 - Gestión de Proyectos. Todos los derechos reservados.
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Conéctate con los desarrolladores:
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Tooltip title="Emita314">
          <IconButton
            component={Link}
            href="https://github.com/Emita314" // Enlace al perfil de GitHub del usuario 1
            target="_blank"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub Usuario 2">
          <IconButton
            component={Link}
            href="https://github.com/usuario2" // Enlace al perfil de GitHub del usuario 2
            target="_blank"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Container>
  </FooterContainer>
);

export default Footer;
