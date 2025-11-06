import React, { useState } from "react";
import { useTasks } from "./usetasks.tsx";

const TodoList = () => {
  const { tasks, loading, error, createTaskHandler, updateTaskHandler, deleteTaskHandler } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    await createTaskHandler({ title: t, description: description.trim() });
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h2>Task List</h2>

      <form onSubmit={onSubmit} style={{ marginBottom: "1rem" }}>
        <input
          name="title"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks
          .filter((t) => t.type === "create" || t.type === "update")
          .map((taskItem) => {
            const key = taskItem.id;
            return (
              <li key={key}>
                <strong>{taskItem.body.title}</strong>
                {taskItem.body.description && <p>{taskItem.body.description}</p>}
                <button
                  onClick={() =>
                    updateTaskHandler(taskItem.id, { title: taskItem.body.title + " (Updated)" })
                  }
                >
                  Update
                </button>
                <button onClick={() => deleteTaskHandler(taskItem.id)}>Delete</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TodoList;
