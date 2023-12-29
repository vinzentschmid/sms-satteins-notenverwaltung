import { Assignment } from './model.assignment';

export class Subject {
  pkSubject: number;
  name: string;
  assignments: Assignment[];

  constructor(pkSubject: number, name: string, assignments: Assignment[]) {
    this.pkSubject = pkSubject;
    this.name = name;
    this.assignments = assignments;
  }
}
