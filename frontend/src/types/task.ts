export interface TaskDTO {
  id?: string;
  title: string;
  description?: string;
}

export type TaskJobData =
  | { type: 'create'; id: string; body: TaskDTO }
  | { type: 'update'; id: string; body: TaskDTO }
  | { type: 'delete'; id: string };
