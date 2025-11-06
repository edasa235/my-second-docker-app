import { useCallback, useEffect, useState } from "react";
import { createtask, deletetask, getalltasks, gettaskbyid, updatetask } from "./apicalls.tsx";
import type { TaskJobData } from "../types/task.ts";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskJobData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Normalize a server item to our TaskJobData 'update' shape
  const normalizeTask = (item: any): TaskJobData => {
    const id = String(item?.id ?? item?._id ?? `srv-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);
    return {
      type: "update",
      id,
      body: {
        title: item?.title ?? "",
        description: item?.description ?? "",
      },
    };
  };

  // simple helper to detect temp ids
  const isTempId = (id?: string) => typeof id === "string" && id.startsWith("temp-");

  // Merge: keep server items and preserve any unmatched local creates (temps)
  const mergeServerWithTemps = (prev: TaskJobData[], serverItems: TaskJobData[]) => {
    const serverTitles = new Set(serverItems.map((s) => (s.body.title || "").trim().toLowerCase()));
    const temps = prev.filter((t) => t.type === "create" && isTempId(t.id) && !serverTitles.has((t.body.title || "").trim().toLowerCase()));
    return [...serverItems, ...temps];
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getalltasks();
      const items = (Array.isArray(data) ? data : []).map(normalizeTask);
      setTasks((prev) => mergeServerWithTemps(prev, items));
    } catch (err: any) {
      setError(err?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  // fetch on mount so consumers get data automatically
  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  const searchTasks = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await gettaskbyid(query);
      const items = (Array.isArray(data) ? data : []).map(normalizeTask);
      setTasks((prev) => mergeServerWithTemps(prev, items));
    } catch (err: any) {
      setError(err?.message || "Failed to search tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTaskHandler = async (newTask: { title: string; description?: string }) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic: TaskJobData = { type: "create", id: tempId, body: { title: newTask.title, description: newTask.description } };
    setTasks((prev) => [optimistic, ...prev]);

    try {
      const created = await createtask(newTask);
      const valid = created && (created.id || created._id || created.title);
      if (valid) {
        const normalized = normalizeTask(created);
        setTasks((prev) => prev.map((t) => (t.id === tempId ? normalized : t)));
      } else {
        // fallback: refresh from server
        setTimeout(() => void fetchTasks(), 300);
      }
    } catch (err: any) {
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      setError(err?.message || "Failed to create task");
    }
  };

  const updateTaskHandler = async (id: string, updates: { title?: string; description?: string }) => {
    const snapshot = tasks.slice();
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, body: { ...t.body, ...updates } } : t)));

    try {
      const updated = await updatetask(id, updates);
      const normalized = normalizeTask(updated);
      setTasks((prev) => prev.map((t) => (t.id === id ? normalized : t)));
    } catch (err: any) {
      setTasks(snapshot);
      setError(err?.message || "Failed to update task");
    }
  };

  const deleteTaskHandler = async (id: string) => {
    const snapshot = tasks.slice();
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await deletetask(id);
    } catch (err: any) {
      setTasks(snapshot);
      setError(err?.message || "Failed to delete task");
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
