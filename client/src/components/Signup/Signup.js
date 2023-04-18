import React from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup';
import FileBase from 'react-file-base64';

import {
    Stack, Button, CssBaseline, TextField, 
    Box, Typography, alpha, FormControl
} from '@mui/material'


const Signup = () => {
    const { signup, isLoading, error } = useSignup();
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [avatar, setAvatar] = React.useState('')


    return (
        <Box sx={{
            height: 'calc(100vh - 76px)',
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <CssBaseline />
            <Stack direction="row" spacing={2} sx={{ height: '100%' }}>
                <Box sx={{ flexGrow: 1 }} />
                <Stack
                    alignItems='center'
                    sx={{
                        py: 2,
                        width: '750px',
                        backgroundColor: alpha('#ffffff', 0.75)
                    }}
                >
                    <Typography variant="h5" sx={{ my: 2 }}>
                        Đăng ký
                    </Typography>
                    <FormControl sx={{ width: '650px' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Tên"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Typography sx={{ mt: 2 }}>Ảnh đại diện:
                            <FileBase type="file" multiple={false} onDone={(e) => setAvatar(e.base64)} />
                        </Typography>
                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            variant="contained"
                            sx={{ my: 2 }}
                            disabled={isLoading}
                            onClick={() => signup({name, username, password, avatar})}>
                            Sign In
                        </Button>
                        <Link to="/login">
                            Quay trở lại đăng nhập
                        </Link>
                    </FormControl>
                </Stack>
                <Box sx={{ flexGrow: 1 }} />
            </Stack>
        </Box >
    )
}

export default Signup