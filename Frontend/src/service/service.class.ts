import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Achten Sie darauf, HttpHeaders zu importieren
import { Observable } from 'rxjs';
import { Class } from '../model/model.class';
import { AuthHeaderService } from './service.authheader';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private apiUrl = 'https://restapinotenverwaltung.azurewebsites.net/api/Classes';

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {} // Injizieren Sie den AuthHeaderService

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.apiUrl, {
      headers: this.authHeaderService.getAuthHeaders(),
      withCredentials: true,
    });
  }

  getClassById(id: number): Observable<Class> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Class>(url, {
      headers: this.authHeaderService.getAuthHeaders(),
      withCredentials: true,
    });
  }
}
