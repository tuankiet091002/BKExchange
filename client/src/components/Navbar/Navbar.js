import React from 'react'
import { Link } from 'react-router-dom'

import { Typography, AppBar, Toolbar, IconButton, Button, Box, Stack, Avatar } from '@mui/material'

import { useAuthContext } from '../../contexts/AuthContext.js'
import { useLogout } from '../../hooks/useLogout'

import logo from '../../assets/logo.png';

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    return (
        <AppBar position="sticky" elevation={6} sx={{mb: '24px'}}>
            <Toolbar>
                <Link to="/">
                    <IconButton
                        color="text.primary"
                    >
                        <Box component="img" sx={{ height: '60px', width: '100px' }} src={logo} />
                    </IconButton>
                </Link>

                <Typography sx={{ flexGrow: 1 }} variant="h4" color="text.primary">Logo với slogan ở đây</Typography>
                {user ?
                    <Stack direction='row' spacing={3} alignItems='center' sx={{ flexGrow: 0.05, color: "text.primary" }}>
                        <IconButton>
                            <Avatar src={user.avatar ? user.avatar : logo} sx={{ width: 40, height: 40 }} />
                            <Typography padding={1} variant="h6" sx={{color: 'white'}}>{user.name}</Typography>
                        </IconButton>
                        <Button variant="contained" sx={{ backgroundColor: 'orange' }} onClick={() => logout()}>Logout</Button>
                    </Stack> :
                    <Link to='/login'>
                        <Button variant="contained" sx={{ backgroundColor: 'orange' }}>Login</Button>
                    </Link>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
