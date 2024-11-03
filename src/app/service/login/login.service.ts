import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable, tap } from 'rxjs';
import { ApiService } from 'src/app/_services/api/api.service';
import { environment } from 'src/environments/environment';

interface Result<T> {
  status: number,
  message: string,
  data: T
}

interface UserDataLogin {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private apiService: ApiService) { }


  login(data: {username: string, password: string}): Observable<Result<UserDataLogin | null>> {
    const path = environment.pathBackend.login;
    return this.apiService.post(path, data).pipe(
      tap((result) => {console.log("Operator tap =====", result)}),
      map(result => {
          let dataResult;
          if (result?.status === 1) {
              dataResult = {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,  
              }
          }
          return {
            status: result.status,
            message: result.message,
            data: dataResult ?? null
          };
      })
    );
  }

  logout(refreshToken: string | null) {
    const data = {
      refreshToken: refreshToken
    }
    const path = environment.pathBackend.logout;
    return this.apiService.post(path, data).pipe(
      map(result => {
        return result
      })
    );
  }

  refreshAccessToken(data: { refreshToken: string | null}): Observable<any> {
    const path = environment.pathBackend.refreshToken;
    return this.apiService.post(path, data).pipe(
      map(result => {
        if (result.status === 1) {
          return {
            accessToken: result.accessToken,
            status: result.status,
            message: result.message
          };
        }
        return false;
      })
    );
  }

  checkVerifyToken(token: string): Observable<any> {
    const bodyCheckToken = {
      token: token
    }
    const path = environment.pathBackend.verifyToken;
    return this.apiService.post(path, bodyCheckToken).pipe(
      map((result) => {
        return {
          code: result.code,
          status: result.status,
          message: result.message
        };
      })
    );
  }


}
