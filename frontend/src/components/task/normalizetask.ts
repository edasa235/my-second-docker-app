import type {TaskJobData} from "../../types/task.ts";

export const normalizeTask = (item: any): TaskJobData => ({
  type: "update",
  id: String(item?.id ?? item?._id ?? `srv-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`),
  body: {
    title: item?.title ?? "",
    description: item?.description ?? "",
  },
});
