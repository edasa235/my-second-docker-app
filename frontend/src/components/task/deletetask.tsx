import {deletetask} from "../apicalls.tsx";
import type {TaskJobData} from "../../types/task.ts";
export const useDeleteTask = (
  tasks: TaskJobData[],
  setTasks: React.Dispatch<React.SetStateAction<TaskJobData[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const deleteTaskHandler = async (id: string) => {
    const snapshot = [...tasks];
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await deletetask(id);
    } catch (err: any) {
      setTasks(snapshot);
      setError(err?.message || "Failed to delete task");
    }
  };
  return { deleteTaskHandler };
}
