import { Injectable } from '@angular/core';
import {
  Assignment,
  AssignmentType,
  Semester,
} from '../model/model.assignment';
import { Subject } from 'src/model/model.subject';
import { mockSubject1, mockSubject2 } from 'src/mock/mock.subjects';
import { Class } from 'src/model/model.class';
import { mockClass, mockClass1 } from 'src/mock/mock.class';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  subjects: Subject[] = [mockSubject1, mockSubject2];
  classes: Class[] = [mockClass, mockClass1];
  private assignments: Assignment[] = [];

  getAssignmentsBySubjectAndSemester(
    subjectId: number,
    semester: Semester,
    assignmentType: AssignmentType
  ): Assignment[] {
    const assignments: Assignment[] = [];
    const subject = this.subjects.find((s) => s.id === subjectId);

    if (subject) {
      subject.assignments.forEach((assignment) => {
        if (
          assignment.semster === semester &&
          (!assignmentType || assignment.type === assignmentType)
        ) {
          assignments.push(assignment);
        }
      });
    }

    return assignments;
  }

  addAssignment(newAssignment: Assignment, subjectId: number): void {
    const subject = this.subjects.find((s) => s.id === subjectId);

    if (subject) {
      subject.assignments.push(newAssignment);
    } else {
      console.error('Subject not found!');
    }
  }
}
