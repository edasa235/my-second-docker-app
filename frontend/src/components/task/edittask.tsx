import { useState } from "react";
import {useTasksContext} from "../../providers/tasks/tasks.context.tsx";

interface EditTaskProps {
  id: string;
  title?: string;
  description?: string;
  onedit?: () => void;
}

const EditTask = ({ id, title: initialTitle = "", description: initialDescription = "", onedit }: EditTaskProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [submitting, setSubmitting] = useState(false);
  const { updateTaskHandler } = useTasksContext();

  const handleedit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload: { title?: string; description?: string } = {};
    try {
      setSubmitting(true);
      await updateTaskHandler(id, payload);
      onedit?.();
    } catch {
      console.error("Failed to edit task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleedit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <br />
        <button type="submit" disabled={submitting}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditTask;
