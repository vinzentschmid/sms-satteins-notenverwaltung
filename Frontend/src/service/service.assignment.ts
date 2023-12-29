import { Injectable } from '@angular/core';
import {
  Assignment,
  AssignmentType,
  Semester,
} from '../model/model.assignment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private apiUrl = 'http://localhost:5013/api/Assignments';

  constructor(private http: HttpClient) {}

  getAssignmentsBySubjectId(subjectId: number): Observable<Assignment[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/BySubject/${subjectId}`)
      .pipe(
        map((assignments) =>
          assignments.map(
            (a) =>
              new Assignment(
                a.assignmentPk,
                new Date(a.creationDate),
                a.reachablePoints,
                this.mapAssignmentType(a.assignmentType),
                this.mapSemester(a.semester)
              )
          )
        )
      );
  }

  private mapAssignmentType(type: string): AssignmentType {
    switch (type) {
      case 'Test':
        return AssignmentType.Test;
      case 'Check':
        return AssignmentType.Check;
      case 'Homework':
        return AssignmentType.Homework;
      case 'Framework':
        return AssignmentType.Framework;
      case 'Total':
        return AssignmentType.Total;
      default:
        return AssignmentType.Test; // Default or throw error
    }
  }

  private mapSemester(semester: string): Semester {
    return semester === 'FirstSemester'
      ? Semester['1.Semester']
      : Semester['2.Semester'];
  }
}
