import { Component, inject, OnInit } from '@angular/core';
import { TaskStatus } from '../models/unit-task.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  TaskStatus = TaskStatus;
  taskService = inject(TaskService);
  taskForm: any;

  ngOnInit(): void {
    this.resetTaskForm();
  }

  onFormSubmit() {
    const task = {
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
      status: +this.taskForm.value.status
    };

    this.taskService.addTaskAsync(task);
    this.resetTaskForm();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  resetTaskForm() {
    this.taskForm = new FormGroup({
      name: new FormControl<string>(''),
      description: new FormControl<string | null>(null),
      dueDate: new FormControl<string>(this.formatDate(new Date())),
      status: new FormControl<TaskStatus>(TaskStatus.Default)
    });
  }
}
