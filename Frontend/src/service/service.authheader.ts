// auth-header.service.ts
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthHeaderService {
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || ''; // Fallback auf einen leeren String, falls kein Token vorhanden
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
