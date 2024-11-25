import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from 'src/app/service/users/users.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserModel} from "../../models/users.model";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'username', 'status', 'action'];
  dataSource = new MatTableDataSource<UserModel[]>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  limit: number = 2;
  offset: number = 0;
  totalItems: number = 0;
  filter: {username: string | null, status: number | null, roleId: number | null } = {
    username: 'hoquangkhai',
    status: null,
    roleId: null,
  };

  constructor(private userService: UsersService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.filter.username = params['username'] || null;
      this.filter.status = params['status'] ? +params['status'] : null;
      this.filter.roleId = params['role'] ? +params['role'] : null;
      this.limit = params['limit'] ? +params['limit'] : 2;
    })
    this.getData();

  }

  ngAfterViewInit() {
    // @ts-ignore
    // this.dataSource.paginator = this.paginator;
  }

  getData(): void {
    const option = {
      limit: this.limit,
      offset: this.offset,
      username: this.filter.username || null,
      status: this.filter.status || null,
      roleId: this.filter.roleId || null,
    }
    this.userService.getList(option).subscribe((result) => {
      if (result.status === 1) {
        this.dataSource.data = result.data;
        this.totalItems = result.total;
        return;
      }
      this.dataSource.data = []
      return
    });
  };

  edit(id: number) {

  }

  delete(id: number) {

  }

  onPageChange(event: any) {
    this.offset = event.pageIndex * event.pageSize;
    this.limit = event.pageSize;
    this.getData();
  }

}
