import { useState } from "react";
import { useTasks } from "./usetasks.tsx";

export const TodoList = () => {
  const {
    tasks,
    loading,
    error,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
  } = useTasks();

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // For edit mode
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ title: "", description: "" });

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await createTaskHandler({ title: newTitle, description: newDescription });
    setNewTitle("");
    setNewDescription("");
  };

  const startEditing = (id: string, title: string, description: string) => {
    setEditingId(id);
    setEditValues({ title, description });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValues({ title: "", description: "" });
  };

  const saveEdit = async (id: string) => {
    await updateTaskHandler(id, editValues);
    setEditingId(null);
  };

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "480px",
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        📝 task List
      </h1>

      {/* Add new task */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
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

      {loading && <p style={{ textAlign: "center", color: "#555" }}>Loading tasks...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* Task list */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {tasks.map((task) => {
          const isEditing = editingId === task.id;
          const title = task?.body?.title ?? "";
          const description = task?.body?.description ?? "";

          return (
            <li
              key={task.id}
              style={{
                padding: "16px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editValues.title}
                    onChange={(e) =>
                      setEditValues((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Task title"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "6px",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  />
                  <input
                    type="text"
                    value={editValues.description}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Task description"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "6px",
                      fontSize: "14px",
                      color: "#555",
                      marginBottom: "12px",
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <button
                      onClick={() => saveEdit(task.id)}
                      style={{
                        backgroundColor: "#1e90ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      style={{
                        backgroundColor: "#ddd",
                        color: "#333",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      margin: "0 0 4px 0",
                      color: "#222",
                    }}
                  >
                    {title || "Untitled Task"}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#777",
                      margin: "0 0 12px 0",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {description || "No description"}
                  </p>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <button
                      onClick={() => startEditing(task.id, title, description)}
                      style={{
                        backgroundColor: "#1e90ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteTaskHandler(task.id)}
                      style={{
                        backgroundColor: "#ff4d4f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
