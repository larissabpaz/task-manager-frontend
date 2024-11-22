import { useEffect } from 'react';
import { Paper, Typography, Button, Tooltip, MenuItem, Select, Chip } from "@mui/material";
import { Container, Box } from "@mui/system";
import { useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import TaskModal from '../components/Modal';
import TaskForm from './TaskForm';
import EmptyState from '../components/EmptyState';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { createTask, deleteTask, getTasks, updateTask } from '../Services/api';
import { api } from '../Services/api-instance';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: 'Tarefas' | 'Em Progresso' | 'Feito';
  categories: string[];
  createdAt: string;
  updatedAt: string | null;
}

export default function TaskPage() {
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
  const [, setUserIsLogged] = useState(false);

  const mapStatus = (status: 'Tarefas' | 'Em Progresso' | 'Feito'): number => {
    switch (status) {
      case 'Tarefas':
        return 0;
      case 'Feito':
        return 1;
      case 'Em Progresso':
        return 2;
      default:
        return 0;
    }
  };

  const fetchTasks = async () => {
    try {
      const tasksFromApi = await api.get('/api/Tasks', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlckBleGFtcGxlLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Ik9wZXJhY2lvbmFsIiwiZXhwIjoxNzMyMjkzOTU1LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjE4IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIxOCJ9.nJcaiu1RyX5Ze5vTBRyHh_xK1UiqqbXXbjmnpX7JtJg"}`,
        }
      });
      setUserIsLogged(true);
      return tasksFromApi.data;
      //setTasks(tasksFromApi);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const statusNumber = mapStatus(status); 
    const task = { title, description, priority, status: statusNumber, categories };
  
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
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', maxHeight: '100%', overflowY: 'auto', marginTop: '5%', marginBottom: '5%', maxWidth: '90%' }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: '90%', minWidth: 300, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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


