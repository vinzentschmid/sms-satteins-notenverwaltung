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

  getUserById(id: number): Observable<User | null> {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return of(user); // Return the found user
    } else {
      return of(null); // Return null if user doesn't exist
    }
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
