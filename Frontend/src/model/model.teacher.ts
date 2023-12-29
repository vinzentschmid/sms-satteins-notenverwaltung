export class Teacher {
  pkTeacher: number;
  name: string;
  email: string;
  firstTitle: string;
  lastTitle: string;
  password: string;

  constructor(
    pkTeacher: number,
    name: string,
    email: string,
    firstTitle: string,
    lastTitle: string,
    password: string
  ) {
    this.pkTeacher = pkTeacher;
    this.name = name;
    this.email = email;
    this.firstTitle = firstTitle;
    this.lastTitle = lastTitle;
    this.password = password;
  }
}
