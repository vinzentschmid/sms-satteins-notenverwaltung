export class Assignment {
  assignmentPk?: number;
  creationDate: Date;
  reachablePoints: number;
  subjectFk: number;
  type: AssignmentType;
  semster: Semester;

  constructor(
    creationDate: Date,
    reachablePoints: number,
    subjectFk: number,
    type: AssignmentType,
    semster: Semester,
    assignmentPk?: number
  ) {
    this.assignmentPk = assignmentPk;
    this.creationDate = creationDate;
    this.reachablePoints = reachablePoints;
    this.subjectFk = subjectFk;
    this.type = type;
    this.semster = semster;
  }
}
export enum AssignmentType {
  Test,
  Check,
  Homework,
  Framework,
}

export enum Semester {
  '1.Semester',
  '2.Semester',
}
