import { useEffect } from "react";
import {useCreateTask} from "./task/createtasks.tsx";
import {useUpdateTask} from "./task/edittask.tsx";
import {useDeleteTask} from "./task/deletetask.tsx";
import {useFetchTasks} from "./task/usefetchtasks.ts";
import {useupadtestatus} from "./task/updattasksstatus.tsx";

export const useTasks = () => {
  const { tasks, setTasks, loading, error, setError, fetchTasks } = useFetchTasks();
  const { createTaskHandler } = useCreateTask(setTasks, setError, fetchTasks);
  const { updateTaskHandler } = useUpdateTask(tasks, setTasks, setError);
  const { deleteTaskHandler } = useDeleteTask(tasks, setTasks, setError);
  const { updatetaskstatusHandler } = useupadtestatus(tasks, setTasks, setError);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
    updatetaskstatusHandler
  };
};
