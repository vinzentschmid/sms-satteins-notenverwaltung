import { Subject } from './model.subject';

export class Class {
  id: number;
  name: string;
  year: Date;
  subjects: Subject[];

  constructor(id: number, name: string, year: Date, subjects: Subject[]) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.subjects = subjects;
  }
}
