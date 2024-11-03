import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../_services/task/task.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      id: [Math.random()],
      name: ['', [Validators.required]],
      completed: [false]
    });
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskForm.get('id')?.setValue(Math.random());
      this.taskForm.get('completed')?.setValue(false);
      console.log("this.taskForm.value", this.taskForm.value);
      this.taskService.addTask(this.taskForm.value);
      this.taskForm.reset();
    }

  }
}
