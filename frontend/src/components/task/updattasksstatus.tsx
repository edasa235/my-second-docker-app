import type { TaskJobData} from "../../types/task";
import { updatetaskstatus} from "../apicalls.tsx";

export const useupadtestatus = (
  tasks: TaskJobData[],
  setTasks: (value: (((prevState: TaskJobData[]) => TaskJobData[]) | TaskJobData[])) => void,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {

  const updatetaskstatusHandler = async (
    id: string,
    updates: { status?: 'todo' | 'inprogress' | 'done' }
  ) => {
    const snapshot = [...tasks];

    // optimistic update
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, ...updates } : t
      )
    );

    try {
      await updatetaskstatus(id, updates);
    } catch (err: any) {
      setTasks(snapshot);
      setError(err?.message || "Failed to update task status");
    }
  };

  return { updatetaskstatusHandler };
};
