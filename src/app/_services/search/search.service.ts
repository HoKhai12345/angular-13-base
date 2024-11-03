import { Injectable } from '@angular/core';
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  search(query: string): Observable<string[]> {
    // Giả lập API trả về danh sách kết quả sau 500ms
    const data = ['Kết quả 1', 'Kết quả 2', 'Kết quả 3', 'Kết quả 3']; // Thay thế bằng dữ liệu thực tế nếu có
    return of(data).pipe(delay(500));
  }

}
