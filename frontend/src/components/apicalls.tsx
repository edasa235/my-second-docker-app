import { Apirepository } from "./apirepository";
const api = new Apirepository();

export const gettaskbyid = (id: string) => api.gettasksbyid(id);
export const getalltasks = () => api.getTasks();
export const createtask = (task: { title: string; description?: string }) => api.createTask(task);
export const updatetask = (id: string, updates: { title?: string; description?: string }) =>
  api.updateTask(id, updates);
export const deletetask = (id: string) => api.deleteTask(id);
