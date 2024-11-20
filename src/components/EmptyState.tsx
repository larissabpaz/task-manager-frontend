import React from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
    message: string;
    icon?: React.ReactNode;
}

export default function EmptyState({ message, icon }: EmptyStateProps) {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
            {icon && <Box mb={2}>{icon}</Box>} 
            <Typography variant="body1" color="textSecondary" align="center">
                {message}
            </Typography>
        </Box>
    );
}
