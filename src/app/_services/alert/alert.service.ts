import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Response {
  type: string,
  text: string
}

@Injectable({
  providedIn: 'root'
})



export class AlertService {
  private subject = new Subject<Response | null>(); 
  constructor() { }

  getSubject() {
    return this.subject;
  }

  success(message: string) {
    this.subject.next({type: 'success', text: message});
}

error(message: string) {
    this.subject.next({type: 'error', text: message});
} 

clear() {
    // clear by calling subject.next() without parameters
    this.subject.next(null);
}
}
