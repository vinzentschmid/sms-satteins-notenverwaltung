import { Injectable } from '@angular/core';
import { User, userRole } from '../model/model.user';
import { Observable, of } from 'rxjs';
import { mockUser1, mockUser2 } from 'src/mock/mock.user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [mockUser1, mockUser2];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getStudentsByClassId(classId: number): Observable<User[]> {
    const students = this.users.filter((user) => {
      if (user.role === userRole.Student) {
        return user.classes?.some((cls) => cls.id === classId);
      } else {
        return false; // Exclude users with other roles
      }
    });
    return of(students);
  }
}
