
export interface TaskDTO {
  title: string;
  description?: string;
  status?: "todo" | "inprogress" | "done";

}
export type TaskJobData =
  | { type: 'create'; body: TaskDTO }
  | { type: 'update'; id: string; body: Partial<TaskDTO> }
  | { type: 'delete'; id: string };
