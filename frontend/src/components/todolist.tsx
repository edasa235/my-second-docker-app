import "./todo.css";
import {useState} from "react";
import {useTasks} from "./usetasks";
import type {TaskJobData, TaskDTO} from "../types/task";
import {TaskForm} from "./taskform";
import {EditForm} from "./editform";
import {TaskItem} from "./taskitem";

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
  const [whiteBg, setWhiteBg] = useState(false);

  const handleEditSave = async (
    id: string,
    values: { title: string; description?: string }
  ) => {
    await updateTaskHandler(id, values);
    setEditingId(null);
  };

  return (
    <div className={`todo-container ${whiteBg ? "white" : "gray"}`}>
      <div className="theme-btn-wrapper">
        <button className="theme-btn" onClick={() => setWhiteBg((prev) => !prev)}>
          {whiteBg ? "Gray Background" : "White Background"}
        </button>
      </div>

      <h1 className="todo-title">📝 Task List</h1>

      {/* Create new task */}
      <div className="create-box">
        <h2 className="create-title">➕ Opprett ny task</h2>
        <TaskForm createTaskHandler={createTaskHandler} loading={loading}/>
      </div>

      {loading && <p className="text-center text-muted">Loading tasks...</p>}
      {error && <p className="text-center text-error">{error}</p>}

      {/* Task list */}
      <ul className="task-list">
        {tasks.filter(hasBody).map((task) => (
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
  );
};

export default TodoList;
