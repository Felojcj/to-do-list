import { Router } from '@angular/router';
import { CoreService } from './../../services/core.service';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Task } from 'src/app/models/task.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatCheckboxModule,
  ],
  standalone: true,
  providers: [DatePipe],
})
export class TaskListComponent {
  tasks: Task[] = [];
  filterTask: Task[] = [];
  filterApplied: 'all'| 'completed' | 'pending' = 'all'
  constructor(private coreService: CoreService, private router: Router) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.coreService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.filterTasks(this.filterApplied)
    });
  }

  filterTasks(filter: 'all'| 'completed' | 'pending') {
    this.filterApplied = filter
    if(filter === 'all') {
      this.displayAll()
    } else if (filter === 'completed') {
      this.displayCompleted()
    } else {
      this.displayPending()
    }
  }

  statusChange(id: string, event: MatCheckboxChange) {
    this.coreService.patchTasks(id, event.checked).subscribe(() => {
      this.getTasks();
    });
  }

  moveHome() {
    this.router.navigate(['']);
  }

  displayAll() {
    this.filterTask = this.tasks;
  }

  displayCompleted() {
    this.filterTask = this.tasks.filter((task) => task.active);
  }

  displayPending() {
    this.filterTask = this.tasks.filter((task) => !task.active);
  }
}
