import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { UnitTask } from '../models/unit-task.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatTableModule, AsyncPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  taskService = inject(TaskService)

  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'description', 'dueDate', 'status'];

  ngOnInit(): void {
    this.setDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data: UnitTask, filter: string) => {
      return data.name.trim().toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyStatusFilter(event: Event) {
    var status = +(event.target as HTMLSelectElement).value;

    if (status < 0) {
      this.setDataSource();
    }

    else {
      this.taskService.getTaskByStatusAsync(status).subscribe(
        result => {
          if (result) {
            this.dataSource = new MatTableDataSource<UnitTask>(result);
          }
        });
    }
    // const statusValue = (event.target as HTMLSelectElement).value;
    // this.dataSource.filterPredicate = (data: UnitTask, filter: string) => {
    //   return statusValue ? data.status.toString() === filter : true;
    // };
    // this.dataSource.filter = statusValue;
  }

  setDataSource() {
    this.taskService.$tasks.subscribe(
      result => {
        if (result) {
          this.dataSource = new MatTableDataSource<UnitTask>(result);
        }
      });
  }
}

