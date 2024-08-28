import { Component, OnInit } from '@angular/core';
import { off } from 'process';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  limit = 10;
  offset = 0;
  constructor(private userService: UsersService) {
    this.getData();
   }

  ngOnInit(): void {
  }

  getData(): void {
    const option = {
      limit: this.limit,
      offset: this.offset
    }
    this.userService.getList(option).subscribe((result) => {

    });
  };

}
