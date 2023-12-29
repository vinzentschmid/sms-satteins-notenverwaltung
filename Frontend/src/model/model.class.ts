import { Student } from './model.student';
import { Subject } from './model.subject';

export class Class {
  pkClass: number;
  name: string;
  year: Date;
  subjects: Subject[];
  students: Student[];

  constructor(
    pkClass: number,
    name: string,
    year: Date,
    subjects: Subject[],
    students: Student[]
  ) {
    this.pkClass = pkClass;
    this.name = name;
    this.year = year;
    this.subjects = subjects;
    this.students = students;
  }
}
