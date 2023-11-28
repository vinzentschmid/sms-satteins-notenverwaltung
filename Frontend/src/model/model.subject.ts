import { Assignment } from './model.assignment';

export class Subject {
  id: number;
  name: string;
  assignments: Assignment[];

  constructor(id: number, name: string, assignments: Assignment[]) {
    this.id = id;
    this.name = name;
    this.assignments = assignments;
  }
}
