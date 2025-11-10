import type {TaskJobData} from "../../types/task.ts";
import {createtask} from "../apicalls.tsx";
import {normalizeTask} from "./normalizetask.ts";

export const useCreateTask = (
  setTasks: React.Dispatch<React.SetStateAction<TaskJobData[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  fetchTasks: () => Promise<void>
) => {
  const createTaskHandler = async (newTask: { title: string; description?: string }) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic: TaskJobData = { type: "create", id: tempId, body: newTask };
    setTasks((prev) => [optimistic, ...prev]);

    try {
      const created = await createtask(newTask);
      if (created?.id || created?._id) {
        const normalized = normalizeTask(created);
        setTasks((prev) => prev.map((t) => (t.id === tempId ? normalized : t)));
      } else {
        await fetchTasks();
      }
    } catch (err: any) {
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      setError(err?.message || "Failed to create task");
    }
  };

  return { createTaskHandler };
};
