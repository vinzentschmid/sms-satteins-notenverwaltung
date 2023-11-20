import { User } from './model.user';

export class Class {
  id: number;
  name: string;
  year: Date;

  constructor(id: number, name: string, year: Date) {
    this.id = id;
    this.name = name;
    this.year = year;
  }
}
