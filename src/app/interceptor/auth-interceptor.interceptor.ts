import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../global';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const excludedUrls = API_CONFIG.excludedUrls;
    const isExcludedUrl = excludedUrls.some(url => request.url.includes(url));
    if (isExcludedUrl) {
      return next.handle(request);
    }
    const token = localStorage.getItem('token');
  
    const clonedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(clonedRequest);
  }
}
