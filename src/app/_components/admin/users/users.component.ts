import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminUsersComponent implements OnInit {
  loading = false;
  users: any[] = [];
  total = 0;
  pageSize = 10;

  constructor() {}

  ngOnInit(): void {}

  onPageChange(event: PageEvent): void {
    // Handle page change
  }
}
