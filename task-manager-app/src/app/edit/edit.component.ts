import { Component, inject, OnInit } from '@angular/core';
import { TaskStatus } from '../models/unit-task.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  taskService = inject(TaskService);

  isTaskForUpdate: boolean = false;
  taskForm: any;
  id: any;

  ngOnInit(): void {
    this.resetTaskForm();
    this.id = new FormControl();
  }

  onFormSubmit() {
    if(!this.isTaskForUpdate){
      this.taskService.addTaskAsync(this.getTaskFormValues());
      this.resetTaskForm();
    }
  }

  getById() {
    this.taskService.getTaskAsync(this.id.value).subscribe(
      result => {
        if (result) {
          this.taskForm.setValue({
            name: result.name,
            description: result.description,
            dueDate: this.taskService.formatDate(result.dueDate),
            status: result.status
          });

          this.isTaskForUpdate = true;
        }
      });
  }

  updateTask() {
    const task = { id: this.id.value, ...this.getTaskFormValues() };
    this.taskService.updateTaskAsync(task).subscribe(
      result => {
        if (result) {
          this.removeUpdateTaskId();
          alert("Task successfully updated");
        } else {
          alert("Task was not updated");          
        }
      });
  }

  removeUpdateTaskId() {
    this.isTaskForUpdate = false;
    this.id = new FormControl();
    this.resetTaskForm();
  }

  private getTaskFormValues() {
    return {
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
      status: +this.taskForm.value.status
    };
  }

  private resetTaskForm() {
    this.taskForm = new FormGroup({
      name: new FormControl<string>(''),
      description: new FormControl<string | null>(null),
      dueDate: new FormControl<string>(this.taskService.formatDate(new Date())),
      status: new FormControl<TaskStatus>(TaskStatus.Default)
    });
  }

}
