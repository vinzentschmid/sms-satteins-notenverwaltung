import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockSubject1, mockSubject2 } from 'src/mock/mock.subjects';
import { Subject } from 'src/model/model.subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  subjects: Subject[] = [mockSubject1, mockSubject2];

  getAllSubjects(): Observable<Subject[]> {
    return of(this.subjects);
  }
}
