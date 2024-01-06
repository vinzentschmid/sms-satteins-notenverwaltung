export class SaveAssignment {
  creationDate: Date;
  reachablePoints: number;
  subjectFk: number;
  assignmentType: string;
  semester: string;

  constructor(
    creationDate: Date,
    reachablePoints: number,
    subjectFk: number,
    assignmentType: string,
    semester: string
  ) {
    this.creationDate = creationDate;
    this.reachablePoints = reachablePoints;
    this.subjectFk = subjectFk;
    this.assignmentType = assignmentType;
    this.semester = semester;
  }
}
