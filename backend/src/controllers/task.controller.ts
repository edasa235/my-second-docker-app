import { Controller, Post, Body, Put, Delete, Param, Get } from 'routing-controllers';
import { tasksQueue } from '../queues/tasks.queue.js';
import { postgres } from "../postgres.js";
import {TaskDTO, TaskJobData} from "../types/task.js";

@Controller('/tasks')
export default class TaskController {

  @Post('/')
  async createTask(@Body() body: TaskDTO) {
    const jobData: TaskJobData = { type: 'create', body };
    console.log('[Controller] Queueing job:', jobData);
     const job = await tasksQueue.add('create', jobData);
     return { message: 'Task creation has been queued', jobId: job.id };
  }

  @Put('/:id')
  async updateTask(@Param('id') id: string, @Body() body: Partial<TaskDTO>) {
    const jobData: TaskJobData = { type: 'update', id, body };
    console.log('[Controller] Queueing update job:', jobData);
    const job = await tasksQueue.add('update', jobData);
    return { message: 'Task update has been queued', jobId: job.id };

  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    const jobData: TaskJobData = { type: 'delete', id };
    console.log('[Controller] Queueing delete job:', jobData);
    const job = await tasksQueue.add('delete', jobData);
    return { message: 'Task deletion has been queued', jobId: job.id };
  }

  @Get('/')
  async getAllTasks() {
    console.log('[Controller] Fetching all tasks from DB...');
    const result = await postgres.query('SELECT id, title, status, created_at FROM tasks ORDER BY created_at DESC');
    console.log('[Controller] DB result:', result.rows);
    return result.rows;
  }
 @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    console.log(`[Controller] Fetching task with id ${id} from DB...`);
    const result = await postgres.query('SELECT id, title, status, created_at FROM tasks WHERE id = $1', [id]);
    console.log('[Controller] DB result:', result.rows[0]);
    return result.rows[0];
  }
}
