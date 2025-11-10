import type {TaskJobData} from "../../types/task.ts";
import {createtask} from "../apicalls.tsx";

export const useCreateTask = (
  setTasks: React.Dispatch<React.SetStateAction<TaskJobData[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const createTaskHandler = async (newTask: { title: string; description?: string }) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic: TaskJobData = {
      type: "update",
      id: tempId,
      body: {
        title: newTask.title,
        description: newTask.description || "",
      },
    };
    setTasks((prev) => [optimistic, ...prev]);

    try {
     await createtask(newTask);

    } catch (err: any) {
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      setError(err?.message || "Failed to create task");
    }
  };

  return { createTaskHandler };
};
