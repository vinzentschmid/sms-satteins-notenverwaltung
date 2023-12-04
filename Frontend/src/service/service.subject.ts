import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockClass, mockClass1 } from 'src/mock/mock.class';
import { Class } from 'src/model/model.class';
import { Subject } from 'src/model/model.subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  classes: Class[] = [mockClass, mockClass1];

  getSubjectsByClassId(classId: number): Observable<Subject[]> {
    const foundClass = this.classes.find((cls) => cls.id === classId);
    if (foundClass) {
      return of(foundClass.subjects);
    } else {
      return of([]);
    }
  }
}
