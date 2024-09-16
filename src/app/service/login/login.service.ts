import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/_services/api/api.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService) { }


  login(data: {username: string, password: string}): Observable<any> {
    const path = environment.pathBackend.login;
    return this.apiService.post(path, data).pipe(
      map(result => {
        if (result.status === 1) {
          return {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            status: result.status,
            message: result.message
          };
        }
        return false;
      })
    );
  }

  refreshAccessToken(data: { token: string | null}): Observable<any> {
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
        if (result.status === 1) {
          return {
            code: result.code,
            status: result.status,
            message: result.message
          };
        }
        return false;
      })
    );
  }

  
}
