import { useState } from "react";

interface EditFormProps {
  initialValues: { title: string; description?: string };
  onSave: (updatedValues: { title: string; description?: string }) => void;
  onCancel: () => void;
}

export const EditForm = ({ initialValues, onSave, onCancel }: EditFormProps) => {
  const [editValues, setEditValues] = useState(initialValues);

  return (
    <>
      <input
        type="text"
        value={editValues.title}
        onChange={(e) => setEditValues((prev) => ({ ...prev, title: e.target.value }))}
        placeholder="Task title"
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          fontSize: "16px",
          marginBottom: "8px",
        }}
      />
      <input
        type="text"
        value={editValues.description || ""}
        onChange={(e) =>
          setEditValues((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="Task description"
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          fontSize: "14px",
          color: "#555",
          marginBottom: "12px",
        }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <button
          onClick={() => onSave(editValues)}
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
          onClick={onCancel}
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
  );
};
