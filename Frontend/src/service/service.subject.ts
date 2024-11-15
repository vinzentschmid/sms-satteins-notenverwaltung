import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'src/model/model.subject';
import { AuthHeaderService } from './service.authheader';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private apiUrl = 'https://restapinotenverwaltung.azurewebsites.net/api/Subjects';

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {} // Injizieren Sie den AuthHeaderService

  getSubjectsByClassId(classId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/ByClass/${classId}`, {
      withCredentials: true,
      headers: this.authHeaderService.getAuthHeaders(),
    });
  }
}
