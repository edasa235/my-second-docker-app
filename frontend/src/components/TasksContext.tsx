import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useTasks as useTasksHook } from "./usetasks.tsx";

type TasksContextType = ReturnType<typeof useTasksHook>;

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const tasksData = useTasksHook();
  const { fetchTasks } = tasksData;

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return <TasksContext.Provider value={tasksData}>{children}</TasksContext.Provider>;
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasksContext must be used within a TasksProvider");
  return context;
};
