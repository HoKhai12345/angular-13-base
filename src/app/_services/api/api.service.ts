import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

   // GET request
   get(path: string, options: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}`, options);
  }

  // POST request
  post(path: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/${path}`, data, { headers });
  }


  // PUT request
  put(id: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/your-endpoint/${id}`, data, { headers });
  }

  // DELETE request
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/your-endpoint/${id}`);
  }
}
