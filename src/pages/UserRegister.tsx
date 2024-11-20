import React, { useState }  from 'react';
import { Typography, TextField, Button, Card, FormControl, Link, Divider } from "@mui/material";
import { Container, Box } from "@mui/system";
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import { useNavigate } from 'react-router-dom';
import { GoogleIcon } from './CustomIcons';

export default function UserRegister() {
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setName(inputValue);
  
      if (inputValue.length < 11) {
        setNameError(true);
        setNameErrorMessage('Insira seu nome completo');
      } else {
        setNameError(false);
        setNameErrorMessage('');
      }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      if (emailError || passwordError || nameError) {
      event.preventDefault();
      return;
      }
      const data = new FormData(event.currentTarget);
      console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      });
    };

    const validateInputs = () => {
      const email = document.getElementById('email') as HTMLInputElement;
      const password = document.getElementById('password') as HTMLInputElement;
      const name = document.getElementById('name') as HTMLInputElement; 

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

      if (!name.value || name.value.length < 10) {
        setNameError(true);
        setNameErrorMessage('Digite seu nome completo.');
        isValid = false;
        } else {
        setNameError(false);
        setNameErrorMessage('');
      }

      if (isValid) {
        navigate('/todo-list');
      }

      return isValid;
    };

    return (
        <Container 
        maxWidth="sm" 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          maxHeight: '100%',
          overflowY: 'auto',
          marginTop: '5%',
          marginBottom: '5%',
          maxWidth: '90%',
      }}>
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
              <InventorySharpIcon sx={{ fontSize: 50, color: '#510c76' }} />
              <Typography color="primary" sx={{fontSize: '24px', justifyContent: 'center'}}>
                Cadastre-se 
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
                        error={nameError}
                        helperText={nameErrorMessage}
                        name="name"
                        placeholder="Nome Completo"
                        type="text"
                        id="name"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={nameError ? 'error' : 'primary'}
                        value={name}
                        onChange={handleNameChange}
                        size='small'
                        label='Nome Completo'
                    />
                    </FormControl>
                    <FormControl>
                    <TextField
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
                        label='E-mail'
                    />
                    </FormControl>
                    <FormControl>
                    <TextField
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
                        label='Senha'
                    />
                    </FormControl>
                    
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                    >
                    Cadastrar
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                    Você já possui uma conta?{' '}
                    <span>
                        <Link
                        href="/"
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                        >
                        Acesse
                        </Link>
                    </span>
                    </Typography>
              </Box>
              <Divider>ou</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => alert('Cadastro feito com Google')}
                    startIcon={<GoogleIcon />}
                    >
                    Cadastre-se com a sua conta Google
                    </Button>
                </Box>
          </Card>
        </Container>
      );
}