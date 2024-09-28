import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  postTasks(newTask: any): Observable<any> {
    return this.http.post(this.apiUrl, newTask);
  }

  patchTasks(id: string, activeStatus: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { active: activeStatus });
  }
}
