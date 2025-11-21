// frontend/src/components/apirepository.tsx
import config from "../config.json";

const host = config.API_HOST;

console.log("API Host:", host);

export class Apirepository {
  async getTasks() {
    const response = await fetch(`${host}/api/tasks`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      console.error("Failed to fetch tasks:", errorData.message);
      throw new Error(`Failed to fetch tasks: ${errorData.message || response.statusText}`);
    }
    return await response.json();
  }

  // existing implementation kept (original name)
  async updateTaskstatus(id: string, updates: { status?: 'todo' | 'inprogress' | 'done' }) {
    if (!updates || updates.status == null) {
      throw new Error('No status provided to update');
    }
    const response = await fetch(`${host}/api/tasks/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to update task status: ${errorData.message || response.statusText}`);
    }
    return await response.json();
  }

  // alias with clearer camelCase so other modules can call updateTaskStatus
  async updateTaskStatus(id: string, updates: { status?: 'todo' | 'inprogress' | 'done' }) {
    return this.updateTaskstatus(id, updates);
  }

  async gettasksbyid(id: string) {
    const response = await fetch(`${host}/api/tasks/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to fetch task by id: ${errorData.message || response.statusText}`);
    }
    return await response.json();
  }

  async createTask(task: { title: string; description?: string }) {
    const response = await fetch(`${host}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to create task: ${errorData.message || response.statusText}`);
    }
    return await response.json();
  }

  async updateTask(id: string, updates: { title?: string; description?: string }) {
    if (!updates || (updates.title == null && updates.description == null)) {
      throw new Error('No fields provided to update');
    }
    const response = await fetch(`${host}/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if(!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to update task: ${errorData.message || response.statusText}`);
    }
    return await response.json();
  }

  async deleteTask(id: string) {
    const response = await fetch(`${host}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`Failed to delete task: ${errorData.message || response.statusText}`);
    }
    if (response.status === 204) {
      return { message: 'Task deleted successfully' };
    }
    return await response.json();
  }
}
