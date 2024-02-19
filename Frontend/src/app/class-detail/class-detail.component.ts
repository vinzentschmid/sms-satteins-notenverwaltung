import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private pkSubject: number | undefined;
  AssignmentType = AssignmentType;
  isTotalActive = false;
  totalPointsByType: number[] = [0, 0, 0, 0];

  constructor(
    private classService: ClassService,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private assignmentService: AssignmentService,
    private studentService: StudentService,
    private studentAssignmentPointsService: StudentAssigmentPointsService,
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
    this.isEditEnabled = false; // Reset edit mode

    this.updateAssignments();
  }

  toggleAssignmentType(assignmentTypeKey: string) {
    const assignmentType: AssignmentType = parseInt(
      assignmentTypeKey,
      10
    ) as AssignmentType;
    this.isEditEnabled = false; // Reset edit mode
    this.updateAssignments();
    if (this.isTotalActive) {
      this.isTotalActive = false;
    }
    this.currentAssignment = assignmentType;
  }
  updateAssignments() {
    if (this.isTotalActive) {
      this.assignments = [];
    } else {
      this.fetchStudentAssignments();
      this.fetchAssignments();
    }
  }

  toggleTotal() {
    this.isTotalActive = !this.isTotalActive;
    if (this.isTotalActive) {
      this.calculateTotalPoints();
      this.assignments = [];
    } else {
      this.updateAssignments();
    }
  }

  onSubjectChange(): void {
    this.isEditEnabled = false; // Reset edit mode
    this.updateAssignments();
  }

  calculateCurrentSemester() {
    const today = new Date();
    const midFebruary = new Date(today.getFullYear(), 2, 15); // 1 is February (months are zero-indexed)

    this.currentSemester =
      today > midFebruary ? Semester['1.Semester'] : Semester['2.Semester'];
  }

  private fetchAssignments(): void {
    if (this.selectedSubject !== undefined) {
      this.pkSubject = this.selectedSubject;
      this.assignmentService
        .getAssignmentsBySubjectId(this.selectedSubject)
        .subscribe(
          (assignments) => {
            if (assignments && assignments.length > 0) {
              if (this.isTotalActive) {
                this.assignments = assignments.filter(
                  (a) => a.semster === this.currentSemester
                );
              } else {
                this.assignments = assignments.filter(
                  (a) =>
                    a.type === this.currentAssignment &&
                    a.semster === this.currentSemester
                );
              }
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

    if (newPoints < 0 || newPoints > assignment.reachablePoints) {
      inputElement.value = this.getPointsForStudentAssignment(
        student,
        assignment
      ).toString();
      return;
    }
    const updatePayload = {
      points: newPoints,
      studentFk: student.pkStudent,
      assignmentFk: assignment.assignmentPk,
    };

    this.studentAssignmentPointsService
      .updateStudentAssignment(studentAssignmentId, updatePayload)
      .subscribe(
        () => {
          const studentAssignmentIndex = this.studentAssignments.findIndex(
            (sa) => sa.studentAssignmentPk === studentAssignmentId
          );
          if (studentAssignmentIndex !== -1) {
            this.studentAssignments[studentAssignmentIndex].points = newPoints;
          }
        },
        (error) => console.error('Error updating points:', error)
      );
  }
  navigateAddAssignment() {
    if (this.pkSubject && this.class) {
      const classId = this.class.pkClass;
      this.router.navigate([
        '/class',
        classId,
        this.pkSubject,
        'add-assignment',
      ]);
    }
  }

  calculateTotalPoints() {
    this.totalPointsByType = [0, 0, 0, 0];

    this.studentAssignments.forEach((studentAssignment) => {
      const assignmentType = studentAssignment.assignmentFkNavigation.type;
      const points = studentAssignment.points;

      if (assignmentType !== undefined) {
        this.totalPointsByType[assignmentType] += points;
      }
    });
  }
}
