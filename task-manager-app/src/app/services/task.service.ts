import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UnitTask } from '../models/unit-task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);
  private url: string = 'https://localhost:7032/api/UnitTask'

  $tasks = this.http.get<UnitTask[]>(this.url);

  constructor() { }

  addTaskAsync(task: any) {
    this.http.post<UnitTask>(this.url, task).subscribe(() => {
      this.refreshTasks();
    });
  }

  deleteTaskAsync(id: number) {
    this.http.delete(`https://localhost:7032/api/UnitTask/${id}`).subscribe(() => {
      this.refreshTasks();
    });
  }

  private refreshTasks(): void {
    this.$tasks = this.http.get<UnitTask[]>(this.url);
  }
}
