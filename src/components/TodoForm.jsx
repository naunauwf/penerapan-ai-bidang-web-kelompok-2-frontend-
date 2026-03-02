import React, { useState } from "react";

const TodoForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description });
    if (!initialData) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Apa yang perlu dilakukan?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Tambahkan Deskripsi (opsional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="2"
      />
      <button type="submit">{initialData ? "Update Todo" : "Add Todo"}</button>
      {initialData && (
        <button
          type="button"
          onClick={() => onSubmit(null)}
          style={{ background: "var(--text-muted)", marginTop: "-0.5rem" }}
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default TodoForm;
