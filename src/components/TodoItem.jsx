import React from "react";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
      </div>
      <div className="todo-actions">
        <button
          className="btn-toggle"
          onClick={() => onToggle(todo)}
          title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed ? "↺" : "✓"}
        </button>
        <button
          className="btn-edit"
          onClick={() => onEdit(todo)}
          title="Edit todo"
        >
          ✎
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(todo.id)}
          title="Delete todo"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
