import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/model/model.student';
import { AuthHeaderService } from './service.authheader';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://restapinotenverwaltung.azurewebsites.net/api/Students';

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {} // Injizieren Sie den AuthHeaderService

  getStudentsByClassId(classId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/ByClass/${classId}`, {
      withCredentials: true,
      headers: this.authHeaderService.getAuthHeaders(),
    });
  }
}
