import { useState } from "react";
import { useTasks } from "./usetasks";
import type { TaskJobData, TaskDTO } from "../types/task";
import {TaskForm} from "./taskform.tsx";
import {EditForm} from "./editform.tsx";
import {TaskItem} from "./taskitem.tsx";

const hasBody = (task: TaskJobData): task is Extract<TaskJobData, { body: TaskDTO }> =>
  task.type === "create" || task.type === "update";

export const TodoList = () => {
  const {
    tasks,
    loading,
    error,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
  } = useTasks();

  const [editingId, setEditingId] = useState<string | null>(null);
  const startEditing = (id: string) => setEditingId(id);
  const cancelEditing = () => setEditingId(null);

  const handleEditSave = async (id: string, values: { title: string; description?: string }) => {
    await updateTaskHandler(id, values);
    setEditingId(null);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "480px",
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "26px",
          fontWeight: "700",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        📝 Task List
      </h1>

      {/* ✅ Add New Task Form */}
      <TaskForm createTaskHandler={createTaskHandler} loading={loading} />

      {loading && <p style={{ textAlign: "center", color: "#555" }}>Loading tasks...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* ✅ Task List */}
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
        {tasks.filter(hasBody).map((task) => {
          const { id, body } = task;
          const isEditing = editingId === id;

          return isEditing ? (
            <EditForm
              key={id}
              initialValues={{
                title: body.title ?? "",
                description: body.description ?? "",
              }}
              onSave={(values) => handleEditSave(id, values)}
              onCancel={cancelEditing}
            />
          ) : (
            <TaskItem
              key={task.id}
              task={task}
              editingId={editingId}
              setEditingId={setEditingId}
              updateTaskHandler={updateTaskHandler}
              deleteTaskHandler={deleteTaskHandler}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
