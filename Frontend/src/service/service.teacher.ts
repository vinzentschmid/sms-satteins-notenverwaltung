import { Injectable } from '@angular/core';
import { mockTeacher1 } from 'src/mock/mock.teacher';
import { Teacher } from 'src/model/model.teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  teachers: Teacher[] = [mockTeacher1];

  getTeacherById(id: number): Teacher | undefined {
    const foundTeacher = this.teachers.find((teacher) => teacher.id === id);
    return foundTeacher;
  }
}
