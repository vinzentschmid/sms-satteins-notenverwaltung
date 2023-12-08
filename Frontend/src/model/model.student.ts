import { Class } from './model.class';

export class Student {
  id: number;
  name: string;
  classObject: Class;

  constructor(id: number, name: string, classObject: Class) {
    this.id = id;
    this.name = name;
    this.classObject = classObject;
  }
}
