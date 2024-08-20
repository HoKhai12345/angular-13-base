import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/_services/api/api.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService) { }


  // async login(data: {username: string, password: string}) {
  //   const dataLogin = data;
  //   const path = environment.pathBackend.login;
  //   return this.apiService.post(path, dataLogin).subscribe((result) => {
  //     if (result.status === 1) {
  //       return {
  //         accessToken: result.accessToken,
  //         status: result.status,
  //         message: result.message
  //       }
  //     }
  //     return false
  //   })

  // }

  async login(data: { username: string, password: string }) {
    const dataLogin = data;
    const path = environment.pathBackend.login;
    
    // Đảm bảo rằng hàm này trả về Observable, sau đó chuyển thành Promise
    const result = await lastValueFrom(await this.apiService.post(path, dataLogin)) as any;
  
    if (result.status === 1) {
      return {
        accessToken: result.accessToken,
        status: result.status,
        message: result.message
      };
    }
  
    return false;
  }
  
}
