import React, { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./services/api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await getTodos();
      if (response.success) {
        setTodos(response.data);
      } else {
        setError(response.message || "Failed to fetch todos");
      }
    } catch (err) {
      setError(
        "Backend is not running or connection failed. Make sure localhost:3000 is active.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddOrUpdate = async (todoData) => {
    if (!todoData) {
      setEditingTodo(null);
      return;
    }

    try {
      if (editingTodo) {
        const response = await updateTodo(editingTodo.id, todoData);
        if (response.success) {
          setTodos(
            todos.map((t) => (t.id === editingTodo.id ? response.data : t)),
          );
          setEditingTodo(null);
        }
      } else {
        const response = await createTodo(todoData);
        if (response.success) {
          setTodos([response.data, ...todos]);
        }
      }
    } catch (err) {
      alert(
        "Error saving todo: " + (err.response?.data?.message || err.message),
      );
    }
  };

  const handleToggle = async (todo) => {
    try {
      const response = await updateTodo(todo.id, {
        completed: !todo.completed,
      });
      if (response.success) {
        setTodos(todos.map((t) => (t.id === todo.id ? response.data : t)));
      }
    } catch (err) {
      alert("Error toggling todo: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      const response = await deleteTodo(id);
      if (response.success) {
        setTodos(todos.filter((t) => t.id !== id));
      }
    } catch (err) {
      alert("Error deleting todo: " + err.message);
    }
  };

  return (
    <div className="app-container">
      <h1>Todo Planner</h1>

      <TodoForm
        key={editingTodo?.id || "new"}
        onSubmit={handleAddOrUpdate}
        initialData={editingTodo}
      />

      {loading ? (
        <div className="loading">Loading your tasks...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={setEditingTodo}
        />
      )}
    </div>
  );
}

export default App;
