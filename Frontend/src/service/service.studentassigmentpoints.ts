import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentAssignment } from 'src/model/model.studentassignmentpoints';

@Injectable({
  providedIn: 'root',
})
export class StudentAssigmentPointsService {
  private apiUrl = 'http://localhost:5013/api/Students/Assignments';
  private apiUrl2 = 'http://localhost:5013/api/Assignments';

  constructor(private http: HttpClient) {}

  getStudentAssignments(): Observable<StudentAssignment[]> {
    return this.http.get<StudentAssignment[]>(this.apiUrl, {
      withCredentials: true,
    });
  }

  updateStudentAssignment(assignmentId: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl2}/${assignmentId}`, payload, {
      withCredentials: true,
    });
  }
}
