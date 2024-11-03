import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasksSubject = new BehaviorSubject<{ name: string, completed: boolean, id: number }[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(task: { name: string, completed: boolean, id: number }) {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);
  }

  getTasks(): Observable<{ name: string, completed: boolean, id: number }[]> {
    return this.tasks$;
  }

  saveCompleted(id: number) {
    let currentTasks = this.tasksSubject.value;
    currentTasks.forEach((value: { completed: boolean, id: number, name: string }) => {
      if (value.id === id) {
         value.completed = true;
      }
    })
    this.tasksSubject.next(currentTasks);
  }

}
