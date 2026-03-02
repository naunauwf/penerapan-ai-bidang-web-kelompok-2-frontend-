import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/todos";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = async () => {
  const response = await api.get("/");
  return response.data;
};

export const getTodoById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await api.post("/", todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await api.put(`/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export default api;
