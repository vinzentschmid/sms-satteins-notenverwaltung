export class Assignment {
  assignmentPk: number;
  creationDate: Date;
  reachablePoints: number;
  type: AssignmentType;
  semster: Semester;

  constructor(
    assignmentPk: number,
    creationDate: Date,
    reachablePoints: number,
    type: AssignmentType,
    semster: Semester
  ) {
    this.assignmentPk = assignmentPk;
    this.creationDate = creationDate;
    this.reachablePoints = reachablePoints;
    this.type = type;
    this.semster = semster;
  }
}
export enum AssignmentType {
  Test,
  Check,
  Homework,
  Framework,
  Total,
}

export enum Semester {
  '1.Semester',
  '2.Semester',
}
