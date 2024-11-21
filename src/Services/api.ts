import { api } from "./api-instance";

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post("/api/Auth/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};

export const register = async (email: string, password: string) => {
    try {
        const response = await api.post("/api/Auth/register", { email, password });
        return response.data;
    } catch (error) {
        console.error("Registration failed", error);
        throw error;
    }
};

export const getTasks = async () => {
    try {
        const response = await api.get("/api/Tasks");
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks", error);
        throw error;
    }
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
