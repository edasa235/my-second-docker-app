import {useCallback, useState} from "react";
import type {TaskJobData} from "../../types/task.ts";
import {getalltasks} from "../apicalls.tsx";
import {normalizeTask} from "./normalizetask.ts";

export const useFetchTasks = () => {

  const [tasks, setTasks] = useState<TaskJobData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getalltasks();
      setTasks(Array.isArray(data) ? data.map(normalizeTask) : []);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);
  return { tasks, setTasks, loading, error, setError, fetchTasks };

}

