import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/_services/api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }

  getList(options: {limit: number, offset: number}): Observable<any> {
    const path = environment.pathBackend.user.getList;
    return this.apiService.get(path, options).pipe(
      map(result => {
        if (result.status === 1) {
          return {
          
          };
        }
        return false;
      }),
      catchError((error) => {
        console.error('User ', error);
        return of(false); // Trả về false nếu có lỗi xảy ra
      })
    );
  }

}
