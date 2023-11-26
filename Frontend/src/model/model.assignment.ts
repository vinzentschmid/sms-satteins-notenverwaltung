export class Assignment {
  id: number;
  date: Date;
  points?: number;

  constructor(id: number, date: Date) {
    this.id = id;
    this.date = date;
  }
}
export class Test extends Assignment {
  constructor(id: number, date: Date) {
    super(id, date);
  }
}
export class Check extends Assignment {
  constructor(id: number, date: Date) {
    super(id, date);
  }
}
export class Homework extends Assignment {
  constructor(id: number, date: Date) {
    super(id, date);
  }
}
export class Framework extends Assignment {
  constructor(id: number, date: Date) {
    super(id, date);
  }
}
