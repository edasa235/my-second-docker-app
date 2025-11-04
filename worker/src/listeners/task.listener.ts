import { Worker, Job } from 'bullmq';
import { redis } from '../redis.js';
import taskJob from "../jobs/task.job";
import {TaskJobData} from "../../types/task.type";

export default function listenToTasks() {
  const worker = new Worker<TaskJobData>(
    'tasks',
    taskJob,
    { connection: redis }
  );
  worker.on('completed', (job) => console.log(`[Listener] Job ${job.id} completed`));
  worker.on('failed', (job, err) => console.error(`[Listener] Job ${job?.id} failed:`, err));

  return worker;
}
