import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskStatus, UnitTask } from '../models/unit-task.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private url: string = 'https://localhost:7032/api/UnitTask';

  TaskStatus = TaskStatus;

  $tasks: Observable<UnitTask[]>;

  constructor(
    private http: HttpClient
  ) {
    this.$tasks = this.http.get<UnitTask[]>(this.url);
  }

  addTaskAsync(task: any) {
    this.http.post<UnitTask>(this.url, task).subscribe(() => {
      this.refreshTasks();
    });
  }

  deleteTaskAsync(id: number) {
    const url = `${this.url}/${id}`;
    this.http.delete(url).subscribe(() => {
      this.refreshTasks();
    });
  }

  getTaskAsync(id: number): Observable<UnitTask> {
    const url = `${this.url}/${id}`;
    return this.http.get<UnitTask>(url);
  }

  updateTaskAsync(task: any): Observable<UnitTask> {
    const url = `${this.url}/${task.id}`;
    return this.http.put<UnitTask>(url, task);
  }

  getTaskByStatusAsync(status: number) {
    return this.http.get<UnitTask[]>(`${this.url}/Status?status=${status}`);
  }

  formatDate(_date: Date): string {
    var date = new Date(_date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private refreshTasks(): void {
    this.$tasks = this.http.get<UnitTask[]>(this.url);
  }
}
