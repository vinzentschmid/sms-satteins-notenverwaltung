import { Assignment } from './model.assignment';
import { Student } from './model.student';

export class StudentAssignmentPoints {
  id: number;
  points: number;
  studentAssignments: Map<Student, Assignment[]>; // Map<Student, Assignment[]>

  constructor(
    id: number,
    points: number,
    studentAssignments: Map<Student, Assignment[]>
  ) {
    this.id = id;
    this.points = points;
    this.studentAssignments = studentAssignments;
  }
}
