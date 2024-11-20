import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Button, Chip, Tooltip } from '@mui/material';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';

interface TaskFormProps {
    title: string;
    description: string;
    priority: string;
    status: 'Tarefas' | 'Em Progresso' | 'Feito';
    categories: string[];
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setPriority: (value: string) => void;
    setStatus: (value: 'Tarefas' | 'Em Progresso' | 'Feito') => void;
    setCategories: (value: string[]) => void;
    onSubmit: () => void;
    isEditMode: boolean;
}

export default function TaskForm ({
    title,
    description,
    priority,
    status,
    setTitle,
    setDescription,
    setPriority,
    setStatus,
    onSubmit,
    isEditMode
} :TaskFormProps) {
    const [categories, setCategories] = useState<string[]>([]);
    const [categoryInput, setCategoryInput] = useState('');

    const predefinedCategories = ['Manutenção', 'Desenvolvimento', 'Reunião'];

    const handleAddCategory = () => {
        if (categoryInput && !categories.includes(categoryInput)) {
            setCategories([...categories, categoryInput]);
            setCategoryInput('');
        }
    };

    const handleDeleteCategory = (categoryToDelete: string) => {
        setCategories(categories.filter(category => category !== categoryToDelete));
    };

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <TextField
                label="Título"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                size="small"
            />
            <TextField
                label="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
                size="small"
            />
            <Select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                displayEmpty
                renderValue={priority ? undefined : () => <em>Prioridade</em>}
                size="small"
            >
                <MenuItem value="Baixa">Baixa</MenuItem>
                <MenuItem value="Média">Média</MenuItem>
                <MenuItem value="Alta">Alta</MenuItem>
            </Select>
            <Select
                value={status}
                onChange={e => setStatus(e.target.value as 'Tarefas' | 'Em Progresso' | 'Feito')}
                displayEmpty
                size="small"
                renderValue={priority ? undefined : () => <em>Progresso da Tarefa</em>}
            >
                <MenuItem value="Tarefas">A Fazer</MenuItem>
                <MenuItem value="Em Progresso">Em Andamento</MenuItem>
                <MenuItem value="Feito">Concluído</MenuItem>
            </Select>
            <Box display="flex" flexWrap="wrap" gap="10px">
                {predefinedCategories.map(category => (
                    <Chip
                        key={category}
                        label={category}
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                            if (!categories.includes(category)) {
                                setCategories([...categories, category]);
                            }
                        }}
                    />
                ))}
            </Box>

            <Box display="flex" gap="10px">
                <TextField
                    label="Nova Categoria"
                    value={categoryInput}
                    onChange={e => setCategoryInput(e.target.value)}
                    size="small"
                />
                <Tooltip title="Adicionar" arrow>
                <Button variant="contained" color="primary" onClick={handleAddCategory}>
                    <AddCommentOutlinedIcon/>
                </Button>
                </Tooltip>
            </Box>

            <Box display="flex" flexWrap="wrap" gap="4px">
                {categories.map(category => (
                    <Chip
                        key={category}
                        label={category}
                        color="primary"
                        onDelete={() => handleDeleteCategory(category)}
                    />
                ))}
            </Box>
            
            <Button variant="contained" color="primary" onClick={onSubmit}>
                {isEditMode ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
            </Button>
        </Box>
    );
};
