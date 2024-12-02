import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminUsersComponent } from './users/users.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';

@NgModule({
  declarations: [AdminUsersComponent, DynamicTableComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [AdminUsersComponent]
})
export class AdminModule { } 