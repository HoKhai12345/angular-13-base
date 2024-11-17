import { Component, OnInit } from '@angular/core';
import {HeaderModel} from "../../models/header.model";
import {TestService} from "../../_services/test/test.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  listHeader: HeaderModel[] | undefined;
  constructor(private testService: TestService) {
    this.testService.headerItems$.subscribe(headerItems => {
        console.log("headerItems", headerItems);
    })
  }

  ngOnInit(): void {
    this.getHeader();
  }

  getHeader() {
    this.listHeader = this.testService.getHeader();
  }

  addHeader(header: HeaderModel) {
    console.log("header", header);
    this.testService.addHeader(header);
  }
}
