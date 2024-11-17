import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HeaderModel} from "../../models/header.model";


@Injectable({
  providedIn: 'root'
})


export class TestService {
  private headerSubject = new BehaviorSubject<HeaderModel[]>([]);
  headerItems$ = this.headerSubject.asObservable();
  constructor() { }

  getHeader(): HeaderModel[] {
     return this.headerSubject.value
  }

  addHeader(header: HeaderModel) {
    const listHeader = this.getHeader();
    console.log("header", header);
    this.headerSubject.next([...listHeader, header]);
  }

  setHeader(header: HeaderModel[]) {
    this.headerSubject.next(header);
  }

}
