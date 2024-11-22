import { api } from "./api-instance";

export const login = async (email: string, senha: string) => {
    try {
      const response = await api.post(
        "/api/Auth/login",
        { email, senha },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem("jwt_token", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
};

export const register = async (email: string, senha: string) => {
    try {
        const response = await api.post("/api/Auth/register", { email, senha });
        return response.data;
    } catch (error) {
        console.error("Registration failed", error);
        throw error;
    }
};

export const getTasks = async () => {
    // const token = localStorage.getItem("jwt_token");
  
    // if (!token) {
    //   console.error("Token não encontrado");
    //   throw new Error("Token não encontrado");
    // }
  
    // try {
      const response = await api.get('/api/Tasks', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlckBleGFtcGxlLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Ik9wZXJhY2lvbmFsIiwiZXhwIjoxNzMyMjkwOTY3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjE4IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIxOCJ9.h1lS8o_YJoizs7uLiZId_jBEpBwsGtCeXLlFHYYCIkQ"}`,
        }
      });
      console.log("CADE o TOKEN??", response.data);
      return response.data;
    // } catch (error) {
    //   console.error('Erro ao buscar tarefas:', error);
    //   throw error;
    // }
};
  
export const createTask = async (task: { title: string; description: string }) => {
    try {
        const response = await api.post("/api/Tasks", task);
        return response.data;
    } catch (error) {
        console.error("Error creating task", error);
        throw error;
    }
};

export const updateTask = async (id: string, task: { title: string; description: string }) => {
    try {
        const response = await api.patch(`/api/Tasks/${id}`, task);
        return response.data;
    } catch (error) {
        console.error("Error updating task", error);
        throw error;
    }
};

export const deleteTask = async (id: string) => {
    try {
        const response = await api.delete(`/api/Tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting task", error);
        throw error;
    }
};
