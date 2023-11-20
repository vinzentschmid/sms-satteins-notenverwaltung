import { Class } from './model.class';
export enum userRole {
  Student = 'Student',
  Teacher = 'Teacher',
}

export class User {
  id: number;
  name: string;
  email: string;
  role: userRole;
  classes?: Class[];

  constructor(
    id: number,
    name: string,
    email: string,
    classes: Class[],
    role: userRole
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.classes = classes || [];
    this.role = role;
  }
}
