import type {TaskJobData} from "../../types/task";
import { updatetask } from "../apicalls.tsx";

export const useUpdateTask = (
  tasks: TaskJobData[],
  setTasks: (value: (((prevState: TaskJobData[]) => TaskJobData[]) | TaskJobData[])) => void,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const updateTaskHandler = async (id: string, updates: { title?: string; description?: string }) => {
    const snapshot = [...tasks];

    // Optimistic update
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, ...updates } : t
      )
    );

    try {
      await updatetask(id, updates);
    } catch (err: any) {
      setTasks(snapshot);
      setError(err?.message || "Failed to update task");
    }
  };

  return { updateTaskHandler };
};
