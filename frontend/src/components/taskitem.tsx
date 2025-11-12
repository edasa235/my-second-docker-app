import type {TaskDTO, TaskJobData} from "../types/task.ts";
import {EditForm} from "./editform.tsx";

interface TaskItemProps {
  task: Extract<TaskJobData, { body: TaskDTO }>;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  updateTaskHandler: (id: string, data: TaskDTO) => Promise<void>;
  deleteTaskHandler: (id: string) => Promise<void>;
}

export const TaskItem = ({
                           task,
                           editingId,
                           setEditingId,
                           updateTaskHandler,
                           deleteTaskHandler,
                         }: TaskItemProps) => {
  const isEditing = editingId === task.id;

  return (
    <li
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
        <EditForm
          initialValues={task.body}
          onSave={async (values) => {
            await updateTaskHandler(task.id, values);
            setEditingId(null);
          }}
          onCancel={() => setEditingId(null)}
        />

      ) : (
        <>
          <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 6px 0", color: "#222" }}>
            {task.body.title || "Untitled Task"}
          </h3>
          <p style={{ fontSize: "14px", color: "#777", margin: "0 0 12px 0", wordWrap: "break-word" }}>
            {task.body.description || "No description"}
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <button
              onClick={() => setEditingId(task.id)}
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
};
