import { Framework, Test, Homework, Check } from './model.assignment';

export class Subject {
  id: number;
  name: string;
  tests: Test[];
  frameworks: Framework[];
  homeworks: Homework[];
  checks: Check[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.tests = [];
    this.frameworks = [];
    this.homeworks = [];
    this.checks = [];
  }
}
