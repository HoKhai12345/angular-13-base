import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../../_services/task/task.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks$ = this.taskService.getTasks();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
  }

  saveComplete(id: number) {
    console.log("id", id);
    this.taskService.saveCompleted(id);
  }
}
