import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Link, Card, Box, Typography, FormControl, TextField, FormControlLabel, Checkbox, Button, Divider } from "@mui/material";
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import ForgotPassword from "../components/ForgotPassword";
import { GoogleIcon } from "../components/CustomIcons";
import { login } from "../Services/api";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [usernameErrorMessage, setusernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (validateInputs()) {
            const loginSuccess = await handleLogin();
    
            if (loginSuccess) {
                navigate('/todo-list');
            } else {
                navigate('/');
            }
        }
    };
    
    const handleLogin = async () => {
        try {
            const response = await login(username,password);
    
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                return true; 
            } else {
                return false; 
            }
        } catch (error) {
            console.error("Login failed", error);
            alert("Falha no login. Tente novamente.");
            return false; 
        }
    };

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        setEmailError(true);
        setEmailErrorMessage('Por favor digite um e-mail válido.');
        isValid = false;
        } else {
        setEmailError(false);
        setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage('A senha deve conter pelo menos 6 dígitos');
        isValid = false;
        } else {
        setPasswordError(false);
        setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <Container 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                maxHeight: '100%',
                overflowY: 'auto',
                marginTop: '5%',
                marginBottom: '5%',
                maxWidth: '90%',
            }}
        >
            <Card variant="outlined" sx={{ padding: 4, maxWidth: '90%', minWidth: 300 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '10vh',
                        marginBottom:'8px'
                    }}
                    >
                    <InventorySharpIcon
                        sx={{ fontSize: 50, color: '#510c76' }}
                    />
                    <Typography color="primary" sx={{ width: '100%', fontSize: '24px' }}>
                    Acesse Seu Gerenciador de Tarefas
                    </Typography>
                </Box>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                    }}
                >
                    <FormControl>
                    <TextField
                        label='E-mail'
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                        sx={{ ariaLabel: 'email' }}
                        size='small'
                    />
                    </FormControl>
                    <FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link
                        component="button"
                        type="button"
                        onClick={handleClickOpen}
                        variant="body2"
                        sx={{ alignSelf: 'baseline' }}
                        >
                        Esqueceu sua senha?
                        </Link>
                    </Box>
                    <TextField
                        label='Senha'
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                        size='small'
                    />
                    </FormControl>
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Lembrar"
                    />
                    <ForgotPassword open={open} handleClose={handleClose} />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                    >
                    Acessar
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                    Você ainda não possui uma conta?{' '}
                    <span>
                        <Link
                        href="/cadastrar"
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                        >
                        Cadastre-se
                        </Link>
                    </span>
                    </Typography>
                </Box>
                <Divider>ou</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => alert('Entrar com Google')}
                    startIcon={<GoogleIcon />}
                    >
                    Entre com sua conta Google
                    </Button>
                </Box>
            </Card>
        </Container>
    );
};
