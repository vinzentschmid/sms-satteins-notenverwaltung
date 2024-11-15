import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentAssignment } from 'src/model/model.studentassignmentpoints';
import { AuthHeaderService } from './service.authheader';

@Injectable({
  providedIn: 'root',
})
export class StudentAssigmentPointsService {
  private apiUrl = 'https://restapinotenverwaltung.azurewebsites.net/api/Students/Assignments';
  private apiUrl2 = 'https://restapinotenverwaltung.azurewebsites.net/api/Assignments';

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {} // Injizieren Sie den AuthHeaderService

  getStudentAssignments(): Observable<StudentAssignment[]> {
    return this.http.get<StudentAssignment[]>(this.apiUrl, {
      withCredentials: true,
      headers: this.authHeaderService.getAuthHeaders(),
    });
  }

  updateStudentAssignment(assignmentId: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl2}/${assignmentId}`, payload, {
      withCredentials: true,
      headers: this.authHeaderService.getAuthHeaders(),
    });
  }
}
