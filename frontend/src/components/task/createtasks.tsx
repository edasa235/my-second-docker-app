import { useState } from "react";
import {useTasksContext} from "../../providers/tasks/tasks.context.tsx";

interface CreateTaskProps { onCreate?: () => void; }

const CreateTask = ({ onCreate }: CreateTaskProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createTaskHandler } = useTasksContext();

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createTaskHandler({ title: title.trim(), description: description.trim() || "" });
      setTitle("");
      setDescription("");
      onCreate?.();
    } catch {
      console.error("Failed to create task");
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleCreate}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="(optional)" />
        </label>
        <br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
