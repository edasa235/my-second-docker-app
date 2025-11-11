import { Controller, Post, Body, Put, Delete, Param, Get } from 'routing-controllers';
import { tasksQueue } from '../queues/tasks.queue.js';
import { postgres } from "../postgres.js";
import {TaskDTO, TaskJobData} from "../types/task.js";

@Controller('/tasks')
export default class TaskController {

  @Post('/')
  async createTask(@Body() body: TaskDTO) {
    const jobData: TaskJobData = { type: 'create', body };
    const job = await tasksQueue.add('create', jobData);
    return { message: 'Task creation queued', jobId: job.id };
  }

  @Put('/:id')
  async updateTask(@Param('id') id: string, @Body() body: Partial<TaskDTO>) {
    const jobData: TaskJobData = { type: 'update', id, body };
    const job = await tasksQueue.add('update', jobData);
    return { message: 'Task update queued', jobId: job.id };
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    const jobData: TaskJobData = { type: 'delete', id };
    const job = await tasksQueue.add('delete', jobData);
    return { message: 'Task deletion queued', jobId: job.id };
  }

  @Get('/')
  async getAllTasks() {
    const result = await postgres.query('SELECT id, title, status, created_at FROM tasks ORDER BY created_at DESC');
    return result.rows;
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    const result = await postgres.query('SELECT id, title, status, created_at FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }
}
