import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/model/model.student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5013/api/Students';

  constructor(private http: HttpClient) {}

  getStudentsByClassId(classId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/ByClass/${classId}`, {
      withCredentials: true,
    });
  }
}
