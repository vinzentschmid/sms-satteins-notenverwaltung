export class Assignment {
  assignmentPk?: number;
  creationDate: Date;
  reachablePoints: number;
  subjectFk: number;
  assignmentType: AssignmentType;
  semester: Semester;

  constructor(
    creationDate: Date,
    reachablePoints: number,
    subjectFk: number,
    assignmentType: AssignmentType,
    semester: Semester,
    assignmentPk?: number
  ) {
    this.assignmentPk = assignmentPk;
    this.creationDate = creationDate;
    this.reachablePoints = reachablePoints;
    this.subjectFk = subjectFk;
    this.assignmentType = assignmentType;
    this.semester = semester;
  }
}
export enum AssignmentType {
  Test = 0,
  Check = 1,
  Homework = 2,
  Framework = 3,
}

export enum Semester {
  '1.Semester',
  '2.Semester',
}
