import { Injectable } from '@angular/core';
import { mockStudent1, mockStudent2 } from 'src/mock/mock.student';
import { Student } from 'src/model/model.student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students: Student[] = [mockStudent1, mockStudent2];

  getStudentsByClassId(classId: number): Promise<Student[]> {
    const filteredStudents: Student[] = [];
    for (const student of this.students) {
      if (student.classObject.id === classId) {
        filteredStudents.push(student);
      }
    }

    return Promise.resolve(filteredStudents);
  }
}
