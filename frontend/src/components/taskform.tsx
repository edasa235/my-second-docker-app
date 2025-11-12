import type {TaskDTO} from "../types/task.ts";
import {useState} from "react";

interface TaskFormProps {
  createTaskHandler: (task: TaskDTO) => Promise<void>;
  loading: boolean;
}

export const TaskForm = ({ createTaskHandler, loading}: TaskFormProps) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await createTaskHandler({ title: newTitle, description: newDescription });
    setNewTitle("");
    setNewDescription("");
  };
  return (<div style={{display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px"}}>
      <input
        type="text"
        placeholder="Task title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "16px",
        }}
      />
      <input
        type="text"
        placeholder="Task description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#555",
        }}
      />
      <button
        onClick={handleAdd}
        disabled={loading}
        style={{
          padding: "10px",
          backgroundColor: "#1e90ff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "600",
          fontSize: "16px",
        }}
      >
        Add Task
      </button>
    </div>

  );
}
