import { Injectable } from '@angular/core';
import { Assignment } from 'src/model/model.assignment';
import { Student } from 'src/model/model.student';
import { StudentAssignmentPoints } from 'src/model/model.studentassignmentpoints';

@Injectable({
  providedIn: 'root',
})
export class StudentAssigmentPointsService {
  private studentAssignmentPoints: StudentAssignmentPoints[] = [];

  addPoints(student: Student, assignment: Assignment, points: number): void {
    const studentAssignmentPoints = this.getStudentAssignmentPoints(student);

    if (studentAssignmentPoints) {
      const existingAssignment =
        studentAssignmentPoints.studentAssignments.get(student);

      if (existingAssignment) {
        existingAssignment.push(assignment);
      } else {
        studentAssignmentPoints.studentAssignments.set(student, [assignment]);
      }
      studentAssignmentPoints.points += points;
    } else {
      const newStudentAssignmentPoints = new StudentAssignmentPoints(
        this.studentAssignmentPoints.length + 1,
        points,
        new Map([[student, [assignment]]])
      );
      this.studentAssignmentPoints.push(newStudentAssignmentPoints);
    }
  }

  getStudentAssignmentPoints(
    student: Student
  ): StudentAssignmentPoints | undefined {
    return this.studentAssignmentPoints.find((sap) =>
      sap.studentAssignments.has(student)
    );
  }
}
