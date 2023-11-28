import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/model/model.class';
import { User } from 'src/model/model.user';
import { Subject } from 'src/model/model.subject';
import { ClassService } from 'src/service/service.class';
import { UserService } from 'src/service/service.user';
import { SubjectService } from 'src/service/service.subject';
import { AssignmentType } from 'src/model/model.assignment';
import { Semester } from 'src/model/model.assignment';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss'],
})
export class ClassDetailComponent implements OnInit {
  class: Class | undefined;
  students: User[] | undefined;
  subjects: Subject[] = [];

  selectedSubject: number | null = null; // Fix: Assign a default value of null

  // AssignmentType is an enum, so we need to convert it to an array
  assignmentTypes = Object.values(AssignmentType).filter(
    (value) => typeof value === 'string'
  );

  semesters: Record<Semester, string> = {
    [Semester['1.Semester']]: '1. Semester',
    [Semester['2.Semester']]: '2. Semester',
  };

  currentSemester!: Semester;

  toggleSemester() {
    this.currentSemester =
      this.currentSemester === Semester['1.Semester']
        ? Semester['2.Semester']
        : Semester['1.Semester'];
  }
  calculateCurrentSemester() {
    const today = new Date();
    const midFebruary = new Date(today.getFullYear(), 1, 15); // 1 is February (months are zero-indexed)

    this.currentSemester =
      today > midFebruary ? Semester['1.Semester'] : Semester['2.Semester'];
  }

  constructor(
    private classService: ClassService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.calculateCurrentSemester();

    this.getClassDetails();
    this.subjectService.getAllSubjects().subscribe((subject) => {
      this.subjects = subject;
    });
    this.selectedSubject = this.subjects[0].id;
  }

  private getClassDetails(): void {
    const classId: number | undefined = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );

    if (classId) {
      this.classService.getClassById(classId).subscribe((cls) => {
        if (cls) {
          this.class = cls;
          this.getStudentsByClassId(cls.id);
        } else {
          console.error(`Class with ID ${classId} not found`);
        }
      });
    } else {
      console.error('Invalid class ID provided');
    }
  }

  private getStudentsByClassId(classId: number): void {
    this.userService.getStudentsByClassId(classId).subscribe((students) => {
      this.students = students;
    });
  }
}
