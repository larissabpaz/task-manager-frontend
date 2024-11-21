import React, { useEffect } from 'react';
import { Paper, Typography, Button, Tooltip, MenuItem, Select, Chip } from "@mui/material";
import { Container, Box } from "@mui/system";
import { useState } from "react";
import ContentPasteOffOutlinedIcon from '@mui/icons-material/ContentPasteOffOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import TaskModal from '../components/Modal';
import TaskForm from './TaskForm';
import EmptyState from '../components/EmptyState';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { createTask, deleteTask, getTasks, updateTask } from '../Services/api';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: 'Tarefas' | 'Em Progresso' | 'Feito';
    categories: string[];
}

export default function ToDoListComponent() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState<'Tarefas' | 'Em Progresso' | 'Feito'>('Tarefas');
    const [editTaskId, setEditTaskId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);    
    const [priorityFilter, setPriorityFilter] = useState(''); 
    const [categoryFilter, setCategoryFilter] = useState('');

    const fetchTasks = async () => {
        try {
          const tasksFromApi = await getTasks();
          setTasks(tasksFromApi);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
    
      useEffect(() => {
        fetchTasks();
      }, []);
    
      const handleAddTask = async () => {
        const task = { title, description, priority, status, categories };
        if (editTaskId !== null) {
          await updateTask(editTaskId, task);
          setEditTaskId(null);
        } else {
          await createTask(task);
        }
        clearFields();
        setIsModalOpen(false);
        fetchTasks();
      };
    
      const clearFields = () => {
        setTitle('');
        setDescription('');
        setPriority('');
        setStatus('Tarefas');
        setCategories([]);
      };
    
      const handleEditTask = (task: Task) => {
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setStatus(task.status);
        setCategories(task.categories);
        setEditTaskId(task.id);
        setIsModalOpen(true);
      };
    
      const handleDeleteTask = async (id: string) => {
        await deleteTask(id);
        fetchTasks();
      };
    
      const columns = ['Tarefas', 'Em Progresso', 'Feito'];
    
      const filteredTasks = tasks.filter(task => {
        const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
        const matchesCategory = categoryFilter ? task.categories.includes(categoryFilter) : true;
        return matchesPriority && matchesCategory;
      });
    
      const hasTasks = filteredTasks.length > 0;
    
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
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              maxWidth: '90%',
              minWidth: 300,
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              Gerenciador de Tarefas
            </Typography>
            <Box display="flex" gap="20px" mb={2}>
              <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
                <PlaylistAddIcon /> Tarefa
              </Button>
    
              <Select
                value={priorityFilter || categoryFilter}
                onChange={e => {
                  const selectedValue = e.target.value;
                  if (['Baixa', 'Média', 'Alta'].includes(selectedValue)) {
                    setPriorityFilter(selectedValue);
                    setCategoryFilter('');
                  } else {
                    setCategoryFilter(selectedValue);
                    setPriorityFilter('');
                  }
                }}
                renderValue={selected => {
                  if (!selected) {
                    return <span><FilterListOutlinedIcon /></span>;
                  }
                  return <span>{selected}</span>;
                }}
                displayEmpty
                size="small"
              >
                <MenuItem value="">Todas as Tarefas</MenuItem>
                <MenuItem value="Baixa">Prioridade Baixa</MenuItem>
                <MenuItem value="Média">Prioridade Média</MenuItem>
                <MenuItem value="Alta">Prioridade Alta</MenuItem>
                {Array.from(new Set(tasks.flatMap(task => task.categories))).map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </Box>
    
            <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={editTaskId !== null ? 'Editar Tarefa' : 'Nova Tarefa'}>
              <TaskForm
                title={title}
                description={description}
                priority={priority}
                status={status}
                categories={categories}
                setTitle={setTitle}
                setDescription={setDescription}
                setPriority={setPriority}
                setCategories={setCategories}
                setStatus={setStatus}
                onSubmit={handleAddTask}
                isEditMode={editTaskId !== null}
              />
            </TaskModal>
    
            {hasTasks ? (
              <Box display="flex" justifyContent="space-between" width="100%" height="50vh" mt={4}>
                {columns.map(column => (
                  <Paper key={column} sx={{ flex: 1, margin: '0 4px', padding: 2, overflow: 'auto', minWidth: '24vh', backgroundColor: '#F7DAFC' }}>
                    <Typography>{column}</Typography>
                    <Box>
                      {filteredTasks.filter(task => task.status === column).map(task => (
                        <Paper
                          key={task.id}
                          style={{
                            margin: '2px',
                            padding: '12px',
                            width: '100%',
                            height: '100%',
                            overflow: 'auto',
                            backgroundColor: task.priority === 'Alta' ? '#ffd3d3' : task.priority === 'Média' ? '#E6E6FA' : '#fff',
                          }}
                        >
                          <Typography variant="h6">{task.title}</Typography>
                          <Typography color="textSecondary">{task.description}</Typography>
                          <Box display="flex" flexWrap="wrap" gap="10px">
                            {task.categories.map(category => (
                              <Chip key={category} label={category} color="primary" />
                            ))}
                          </Box>
                          <Box mt={2} display="flex" justifyContent="space-between">
                            <Tooltip title="Editar" arrow>
                              <Button onClick={() => handleEditTask(task)}>
                                <EditOutlinedIcon />
                              </Button>
                            </Tooltip>
                            <Tooltip title="Apagar" arrow>
                              <Button color="error" onClick={() => handleDeleteTask(task.id)}>
                                <DeleteOutlineOutlinedIcon />
                              </Button>
                            </Tooltip>
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              <EmptyState message="Ops! Você ainda não criou uma tarefa." icon={<FilterListOutlinedIcon sx={{ fontSize: '5rem' }} />} />
            )}
          </Paper>
        </Container>
      );
}
