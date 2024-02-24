import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/model/model.teacher';
import { AuthHeaderService } from './service.authheader';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = 'http://localhost:5013/api/Teachers';

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {} // Injizieren Sie den AuthHeaderService

  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
      headers: this.authHeaderService.getAuthHeaders(),
    });
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl, {
      withCredentials: true,
      headers: this.authHeaderService.getAuthHeaders(),
    });
  }
}
