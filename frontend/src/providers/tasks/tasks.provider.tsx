import { useTasks as useTasksHook } from "../../components/usetasks.tsx";
import {type ReactNode, useEffect} from "react";
import { TasksContext } from "./tasks.context.tsx";


export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const tasksData = useTasksHook();
  const { fetchTasks } = tasksData;

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TasksContext.Provider value={tasksData}>
      {children}
    </TasksContext.Provider>
  );
};
