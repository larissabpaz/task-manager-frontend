import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, OutlinedInput, DialogActions, Button } from '@mui/material';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}
  
export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Redefir senha</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
        >
          <DialogContentText>
            Digite seu e-mail de acesso, para poder receber o link para redefir sua senha.
          </DialogContentText>
          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email de acesso"
            placeholder="Email"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" type="submit">
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    );
}
  