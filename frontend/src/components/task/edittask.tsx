import type { TaskJobData } from "../../types/task";
import {updatetask} from "../apicalls.tsx";

export const useUpdateTask = (
  tasks: TaskJobData[],
  setTasks: React.Dispatch<React.SetStateAction<TaskJobData[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const updateTaskHandler = async (id: string, updates: { title?: string; description?: string }) => {
    const snapshot = [...tasks];
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id && "body" in t ? { ...t, body: { ...t.body, ...updates } } : t
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
