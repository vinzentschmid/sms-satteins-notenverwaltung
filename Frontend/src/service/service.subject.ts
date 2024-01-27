import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'src/model/model.subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private apiUrl = 'http://localhost:5013/api/Subjects';

  constructor(private http: HttpClient) {}

  getSubjectsByClassId(classId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/ByClass/${classId}`, {
      withCredentials: true,
    });
  }
}
