import { Class } from './model.class';

export class Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  firstTitle?: string;
  lastTitle?: string;
  classes?: Class[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    firstTitle?: string,
    lastTitle?: string,
    classes?: Class[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.firstTitle = firstTitle;
    this.lastTitle = lastTitle;
    this.classes = classes;
  }
}
