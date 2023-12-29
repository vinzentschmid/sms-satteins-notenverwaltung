import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/model/model.class';
import { Subject } from 'src/model/model.subject';
import { ClassService } from 'src/service/service.class';
import { SubjectService } from 'src/service/service.subject';
import { Assignment, AssignmentType } from 'src/model/model.assignment';
import { Semester } from 'src/model/model.assignment';
import { AssignmentService } from 'src/service/service.assignment';
import { Student } from 'src/model/model.student';
import { StudentService } from 'src/service/service.student';
import { StudentAssigmentPointsService } from 'src/service/service.studentassigmentpoints';
import { StudentAssignment } from 'src/model/model.studentassignmentpoints';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss'],
})
export class ClassDetailComponent implements OnInit {
  class: Class | undefined;
  students: Student[] | undefined;
  subjects: Subject[] = [];
  selectedSubject: number | undefined;
  assignments: Assignment[] = [];
  isEditEnabled = false;
  studentAssignments: StudentAssignment[] = [];
  private pkClass: number | undefined;

  constructor(
    private classService: ClassService,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private assignmentService: AssignmentService,
    private studentService: StudentService,
    private studentAssignmentPointsService: StudentAssigmentPointsService
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
    this.pkClass = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!this.pkClass) {
      console.error('Invalid class ID provided');
      return;
    }
    this.getClassDetails();
    this.getStudentsByClassId(this.pkClass);
    this.getSubjectsByClassId(this.pkClass);
  }

  toggleSemester() {
    this.currentSemester =
      this.currentSemester === Semester['1.Semester']
        ? Semester['2.Semester']
        : Semester['1.Semester'];

    this.updateAssignments();
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
    this.fetchStudentAssignments();
    this.fetchAssignments();
  }

  onSubjectChange(): void {
    this.updateAssignments();
  }

  calculateCurrentSemester() {
    const today = new Date();
    const midFebruary = new Date(today.getFullYear(), 1, 15); // 1 is February (months are zero-indexed)

    this.currentSemester =
      today > midFebruary ? Semester['1.Semester'] : Semester['2.Semester'];
  }

  private fetchAssignments(): void {
    if (this.selectedSubject !== undefined) {
      this.assignmentService
        .getAssignmentsBySubjectId(this.selectedSubject)
        .subscribe(
          (assignments) => {
            if (assignments && assignments.length > 0) {
              this.assignments = assignments.filter(
                (a) =>
                  a.type === this.currentAssignment &&
                  a.semster === this.currentSemester
              );
            } else {
              this.assignments = [];
            }
          },
          () => {
            this.assignments = [];
          }
        );
    } else {
      this.assignments = [];
    }
  }

  private getClassDetails(): void {
    if (!this.pkClass) {
      console.error('Invalid class ID provided');
      return;
    }

    this.classService.getClassById(this.pkClass).subscribe(
      (cls) => {
        this.class = cls;
      },
      (error) => console.error(`Error fetching class details: ${error}`)
    );
  }

  private getStudentsByClassId(classId: number): void {
    this.studentService.getStudentsByClassId(classId).subscribe(
      (students) => (this.students = students),
      (error) => console.error(`Error fetching students: ${error}`)
    );
  }

  private getSubjectsByClassId(classId: number): void {
    this.subjectService.getSubjectsByClassId(classId).subscribe(
      (subjects) => {
        this.subjects = subjects;
        this.selectedSubject =
          this.subjects.length > 0 ? this.subjects[0].pkSubject : 0;
        this.calculateCurrentSemester();
        this.updateAssignments();
      },
      (error) => console.error(`Error fetching subjects: ${error}`)
    );
  }

  private fetchStudentAssignments(): void {
    this.studentAssignmentPointsService.getStudentAssignments().subscribe(
      (data) => {
        this.studentAssignments = data;
      },
      (error) => console.error('Error fetching student assignments:', error)
    );
  }

  getPointsForStudentAssignment(
    student: Student,
    assignment: Assignment
  ): number {
    const studentAssignment = this.studentAssignments.find(
      (sa) =>
        sa.studentFkNavigation.pkStudent === student.pkStudent &&
        sa.assignmentFkNavigation.assignmentPk === assignment.assignmentPk
    );

    return studentAssignment ? studentAssignment.points : 0;
  }

  getStudentAssignmentId(student: Student, assignment: Assignment): number {
    const studentAssignment = this.studentAssignments.find(
      (sa) =>
        sa.studentFkNavigation.pkStudent === student.pkStudent &&
        sa.assignmentFkNavigation.assignmentPk === assignment.assignmentPk
    );

    return studentAssignment ? studentAssignment.studentAssignmentPk : 0;
  }

  updateStudentAssignment(
    student: Student,
    assignment: Assignment,
    event: Event,
    studentAssignmentId: number
  ): void {
    const inputElement = event.target as HTMLInputElement;
    const newPoints = inputElement.valueAsNumber;
    const updatePayload = {
      points: newPoints,
      studentFk: student.pkStudent,
      assignmentFk: assignment.assignmentPk,
    };

    this.studentAssignmentPointsService
      .updateStudentAssignment(studentAssignmentId, updatePayload)
      .subscribe(
        () => {
          this.fetchStudentAssignments();
        },
        (error) => console.error('Error updating points:', error)
      );
  }
}
