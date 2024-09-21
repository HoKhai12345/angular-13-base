// auth.guard.ts
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {catchError, map, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    return this.authService.isLoggedIn().pipe(
      map((checkVerify: any) => {
        if (checkVerify) {
          if (checkVerify.code === 403) {
            this.authService.refreshAccessToken().subscribe((result) => {
              console.log("*******************", result);
              if (!result) {
                localStorage.removeItem('accessToken');
                this.router.navigate(['/login']); // Token không hợp lệ, điều hướng đến login
                return true;
              }
              return result;
            });
          } else if (checkVerify.code === 401) {
            localStorage.removeItem('accessToken');
            this.router.navigate(['/login']);
            return false;
          }
          return true; // Token hợp lệ
        } else {
          localStorage.removeItem('accessToken');
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error verifying token', error);
        this.router.navigate(['/login']); // Xử lý lỗi và điều hướng đến login
        return of(false); // Trả về Observable<boolean> với giá trị false
      })
    );
  }
}



// canActivate(): boolean {
//   return this.authService.isLoggedIn().pipe(
//     switchMap((checkVerify: any) => {
//       if (checkVerify) {
//         // Trường hợp mã lỗi 403: Token cần được refresh
//         if (checkVerify.code === 403) {
//           return this.authService.refreshAccessToken().pipe(
//             switchMap((result) => {
//               if (!result) {
//                 this.handleLogout();
//                 return of(false); // Điều hướng đến login và trả về false
//               }
//               return of(true); // Token đã được refresh thành công
//             })
//           );
//         }
//         // Trường hợp mã lỗi 401: Token không hợp lệ
//         if (checkVerify.code === 401) {
//           this.handleLogout();
//           return of(false); // Token không hợp lệ
//         }
//         return of(true); // Token hợp lệ
//       } else {
//         this.handleLogout();
//         return of(false); // Token không hợp lệ
//       }
//     }),
//     catchError((error) => {
//       console.error('Error verifying token', error);
//       this.handleLogout();
//       return of(false); // Trả về false khi có lỗi xảy ra
//     })
//   );
// }
// private handleLogout(): void {
//   localStorage.removeItem('accessToken');
//   this.router.navigate(['/login']);
// }
