import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisualizeService {
  private visualizeSubject = new Subject<string>();
  visualize$ = this.visualizeSubject.asObservable();

  constructor() { }


  setVisualize(type: string) {
    this.visualizeSubject.next(type);
  }
}
