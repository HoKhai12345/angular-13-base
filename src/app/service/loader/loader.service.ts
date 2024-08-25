import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loaderSubject = new BehaviorSubject<boolean>(false);
  public loaderState = this.loaderSubject.asObservable();

  showLoader() {
    this.loaderSubject.next(true);
  }

  hideLoader() {
    setTimeout(() => {
      this.loaderSubject.next(false);
    }, 1000);
  }

  get isLoading(): boolean {
    return this.loaderSubject.getValue();
  }


}
