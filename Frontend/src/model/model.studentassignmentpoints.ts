import { Assignment } from './model.assignment';
import { Student } from './model.student';

export class StudentAssignment {
  studentAssignmentPk: number;
  points: number;
  assignmentFkNavigation: Assignment;
  studentFkNavigation: Student;

  constructor(
    studentAssignmentPk: number,
    points: number,
    assignmentFkNavigation: Assignment,
    studentFkNavigation: Student
  ) {
    this.studentAssignmentPk = studentAssignmentPk;
    this.points = points;
    this.assignmentFkNavigation = assignmentFkNavigation;
    this.studentFkNavigation = studentFkNavigation;
  }
}
