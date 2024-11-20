import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface TaskModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function TaskModal({ open, onClose, title, children }: TaskModalProps)  {
    const handleBackdropClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <Modal open={open} onClose={onClose} hideBackdrop >
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 2,
                }}
                onClick={handleBackdropClick}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="h2" gutterBottom>
                        {title}
                    </Typography>
                    <Button onClick={onClose} color="primary">
                        <CloseRoundedIcon />
                    </Button>
                </Box>
                {children}
            </Box>
        </Modal>
    );
};
