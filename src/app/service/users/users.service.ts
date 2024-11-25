import { Injectable } from '@angular/core';
import {catchError, filter, map, Observable, of, tap} from 'rxjs';
import { ApiService } from 'src/app/_services/api/api.service';
import { environment } from 'src/environments/environment';
import {UserModel} from "../../models/users.model";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }

  getList(options: {limit: number, offset: number}): Observable<any> {
    console.log("options", options);
    const path = environment.pathBackend.user.getList;
    let params = new HttpParams();
    if (options.limit) {
      params = params.set('limit', options.limit.toString());
    }
    if (options.offset) {
      params = params.set('offset', options.offset.toString());
    }
    return this.apiService.get(path, options).pipe(
      filter((result) => result.status === 1),
      map((result) => ({
        status: result.status,
        message: result?.message,
        data: result.data.rows.map((value: UserModel) => new UserModel(value)),
        total: result.data.count ?? 0
      })),
      tap((response) => {
        console.log('User list fetched:', response.data);
      }),
      catchError((error) => {
        console.error('User ', error);
        return of(false);
      })
    );
  }



}
