import { useState } from "react";
import {
  createtask,
  deletetask,
  getalltasks,
  gettaskbyid,
  updatetask,
} from "./apicalls.tsx";
import type { TaskJobData } from "../../type.ts";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskJobData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async (
    fetchFunction: () => Promise<TaskJobData[]> = getalltasks
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFunction();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const searchTasks = async (
    query: string,
    searchFunction: (query: string) => Promise<TaskJobData[]> = gettaskbyid
  ) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchFunction(query);
      setTasks(results);
    } catch (err: any) {
      setError(err.message || "Failed to search tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTaskHandler = async (
    newTask: { title: string; description: string },
    createTaskFn: (
      task: { title: string; description: string }
    ) => Promise<TaskJobData> = createtask
  ) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticTask: TaskJobData & { id: string } = {
      id: tempId,
      type: "create",
      body: { ...newTask },
    };

    setTasks((prev) => [...prev, optimisticTask]);

    try {
      const createdTask = await createTaskFn(newTask);
      setTasks((prev) =>
        prev.map((task) => ("id" in task && task.id === tempId ? createdTask : task))
      );
    } catch (err: any) {
      setTasks((prev) => prev.filter((task) => !("id" in task && task.id === tempId)));
      setError(err.message || "Failed to create task");
    }
  };

  const updateTaskHandler = async (
    id: string,
    updates: { title?: string; description?: string },
    updateTaskFn: (
      id: string,
      updates: { title?: string; description?: string }
    ) => Promise<TaskJobData> = updatetask
  ) => {
    const prevTasks = [...tasks];

    setTasks((prev) =>
      prev.map((task) => {
        if (
          (task.type === "update" || task.type === "create") &&
          "body" in task &&
          "id" in task &&
          task.id === id
        ) {
          return {
            ...task,
            body: { ...task.body, ...updates },
          };
        }
        return task;
      })
    );

    try {
      const updatedTask = await updateTaskFn(id, updates);
      setTasks((prev) =>
        prev.map((task) => ("id" in task && task.id === id ? updatedTask : task))
      );
    } catch (err: any) {
      setTasks(prevTasks);
      setError(err.message || "Failed to update task");
    }
  };

  const deleteTaskHandler = async (
    id: string,
    deleteTaskFn: (id: string) => Promise<TaskJobData> = deletetask
  ) => {
    const prevTasks = [...tasks];

    setTasks((prev) => prev.filter((task) => !("id" in task && task.id === id)));

    try {
      await deleteTaskFn(id);
    } catch (err: any) {
      setTasks(prevTasks);
      setError(err.message || "Failed to delete task");
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    searchTasks,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
  };
};
