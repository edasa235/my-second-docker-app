import { useState } from "react";
import {useTasks} from "./usetasks.tsx";

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

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await createTaskHandler({ title: newTitle, description: newDescription });
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">📝 LUCAS SKIBIDI</h1>

      {/* Input for creating a new task */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Task description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Add Task
        </button>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Task list */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <input
                type="text"
                value={task.body.title}
                onChange={(e) =>
                  updateTaskHandler(task.id, { title: e.target.value })
                }
                className="font-semibold border-b focus:outline-none"
              />
              {task.body.description && (
                <p className="text-sm text-gray-600">
                  {task.body.description}
                </p>
              )}
            </div>
            <button
              onClick={() => deleteTaskHandler(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
