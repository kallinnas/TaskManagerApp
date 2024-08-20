import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  taskService = inject(TaskService)
  
}
