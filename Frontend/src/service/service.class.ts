import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Class } from '../model/model.class';
import { mockClass, mockClass1 } from '../mock/mock.class';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  mockClasses: Class[] = [mockClass, mockClass1];

  getClasses(): Observable<Class[]> {
    return of(this.mockClasses);
  }

  getClassById(id: number): Observable<Class | undefined> {
    const foundClass = this.mockClasses.find((cls) => cls.id === id);
    return of(foundClass);
  }
}
