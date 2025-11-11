import { createContext, useContext } from "react";
import { useTasks as useTasksHook } from "../../components/usetasks.tsx";
type TasksContextType = ReturnType<typeof useTasksHook>;

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return context;
};
