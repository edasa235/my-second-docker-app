import "./todo.css";
import { useState } from "react";
import { useTasks } from "./usetasks";
import type { TaskJobData, TaskDTO } from "../types/task";
import { TaskForm } from "./taskform";
import { EditForm } from "./editform";
import { TaskItem } from "./taskitem";

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
  const [theme, setTheme] = useState("light");

  const handleEditSave = async (
    id: string,
    values: { title: string; description?: string }
  ) => {
    await updateTaskHandler(id, values);
    setEditingId(null);
  };

  const columns = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
  };

  const grouped = Object.fromEntries(
    Object.keys(columns).map((col) => [col, [] as any[]])
  );

  tasks.filter(hasBody).forEach((task) => {
    const status = task.body.status || "todo";
    grouped[status]?.push(task);
  });

  return (
    <div className={`todo-container ${theme}`}>
      <div className="theme-btn-wrapper">
        <button className="theme-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      <h1 className="todo-title">task list</h1>

      <div className="create-box">
        <h2 className="create-title">➕ Opprett ny task</h2>
        <TaskForm createTaskHandler={createTaskHandler} loading={loading}/>
      </div>

      {loading && <p className="text-center text-muted">Loading tasks...</p>}
      {error && <p className="text-center text-error">{error}</p>}

      <div className="kanban-board">
        {Object.entries(columns).map(([key, label]) => (
          <div key={key} className="kanban-column">
            <h2>{label}</h2>
            <ul>
              {grouped[key].map((task) => (
                <li key={task.id}>
                  {editingId === task.id ? (
                    <EditForm
                      initialValues={{
                        title: task.body.title ?? "",
                        description: task.body.description ?? "",
                      }}
                      onSave={(values) => handleEditSave(task.id, values)}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <TaskItem
                      task={task}
                      editingId={editingId}
                      setEditingId={setEditingId}
                      updateTaskHandler={updateTaskHandler}
                      deleteTaskHandler={deleteTaskHandler}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
