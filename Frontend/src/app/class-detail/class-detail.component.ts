import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from 'src/model/model.class';
import { User } from 'src/model/model.user';
import { Subject } from 'src/model/model.subject';
import { ClassService } from 'src/service/service.class';
import { UserService } from 'src/service/service.user';
import { SubjectService } from 'src/service/service.subject';
import { Assignment, AssignmentType } from 'src/model/model.assignment';
import { Semester } from 'src/model/model.assignment';
import { AssignmentService } from 'src/service/service.assignment';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss'],
})
export class ClassDetailComponent implements OnInit {
  class: Class | undefined;
  students: User[] | undefined;
  subjects: Subject[] = [];
  selectedSubject!: number;
  assignments: Assignment[] = [];
  private classId: number | undefined;

  constructor(
    private classService: ClassService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private subjectService: SubjectService,
    private assignmentService: AssignmentService,
    private router: Router
  ) {}

  assignmentTypesFilter = Object.values(AssignmentType).filter(
    (value) => typeof value === 'string'
  );

  semesters: Record<Semester, string> = {
    [Semester['1.Semester']]: '1. Semester',
    [Semester['2.Semester']]: '2. Semester',
  };

  assignmentTypes = {
    [AssignmentType.Test]: 'Test',
    [AssignmentType.Check]: 'Check',
    [AssignmentType.Homework]: 'Homework',
    [AssignmentType.Framework]: 'Framework',
    [AssignmentType.Total]: 'Total',
  };

  currentAssignment: AssignmentType = AssignmentType.Test;

  currentSemester!: Semester;

  ngOnInit(): void {
    this.getClassDetails();

    if (this.classId === undefined) {
      return;
    }
    this.subjectService
      .getSubjectsByClassId(this.classId)
      .subscribe((subjects) => {
        this.subjects = subjects;
        this.selectedSubject =
          this.subjects.length > 0 ? this.subjects[0].id : 0;

        this.calculateCurrentSemester();

        this.fetchAssignments();
      });
  }

  toggleSemester() {
    this.currentSemester =
      this.currentSemester === Semester['1.Semester']
        ? Semester['2.Semester']
        : Semester['1.Semester'];

    this.fetchAssignments();
  }

  toggleAssignmentType(assignmentTypeKey: string) {
    const assignmentType: AssignmentType = parseInt(
      assignmentTypeKey,
      10
    ) as AssignmentType;
    this.currentAssignment = assignmentType;
    this.updateAssignments();
  }
  updateAssignments() {
    this.fetchAssignments();
  }

  onSubjectChange() {
    this.fetchAssignments();
  }

  calculateCurrentSemester() {
    const today = new Date();
    const midFebruary = new Date(today.getFullYear(), 1, 15); // 1 is February (months are zero-indexed)

    this.currentSemester =
      today > midFebruary ? Semester['1.Semester'] : Semester['2.Semester'];
  }

  private fetchAssignments(): void {
    this.assignments = this.class?.id
      ? this.assignmentService.getAssignmentsBySubjectAndSemester(
          this.selectedSubject,
          this.currentSemester,
          this.currentAssignment
        )
      : [];
  }

  private getClassDetails(): void {
    this.classId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (!this.classId) {
      console.error('Invalid class ID provided');
      return;
    }

    this.classService.getClassById(this.classId).subscribe((cls) => {
      if (cls) {
        this.class = cls;
        this.getStudentsByClassId(cls.id);
      } else {
        console.error(`Class with ID ${this.classId} not found`);
      }
    });
  }

  private getStudentsByClassId(classId: number): void {
    this.userService.getStudentsByClassId(classId).subscribe((students) => {
      this.students = students;
    });
  }
}
