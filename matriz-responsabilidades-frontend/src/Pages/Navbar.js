import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({ user, onLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#222' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                    <Button component={Link} to="/" color="inherit">
                        <Typography variant="button">Inicio</Typography>
                    </Button>
                    {user?.rol === 'Administrador' && (
                        <>
                            <Button component={Link} to="/crear-empleado" color="inherit">
                                <Typography variant="button">Crear Empleado</Typography>
                            </Button>
                            <Button component={Link} to="/matriz" color="inherit">
                                <Typography variant="button">Matriz</Typography>
                            </Button>
                        </>
                    )}
                    {user?.rol === 'Empleado' && (
                        <Button component={Link} to="/empleado/actividades" color="inherit">
                            <Typography variant="button">Mis Actividades</Typography>
                        </Button>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {!user ? (
                        <>
                            <Button component={Link} to="/login" color="inherit">
                                <Typography variant="button">Login</Typography>
                            </Button>
                            <Button component={Link} to="/signup" color="inherit">
                                <Typography variant="button">Sign Up</Typography>
                            </Button>
                        </>
                    ) : (
                        <>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                onClick={handleMenuOpen}
                            >
                                <AccountCircle />
                            </IconButton>
                            {/* Menú desplegable */}
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleMenuClose} component={Link} to="/perfil">
                                    Perfil
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                        onLogout();
                                    }}
                                >
                                    Cerrar sesión
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
