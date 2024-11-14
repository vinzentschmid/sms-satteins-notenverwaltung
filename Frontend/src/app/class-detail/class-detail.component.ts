/* eslint-disable no-prototype-builtins */
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
  totalPoints = 0;

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

    if (this.isTotalActive) {
      this.assignments = [];
      this.calculateTotalPoints();
      this.calculateReachablePointsForType();
    } else {
      this.updateAssignments();
    }
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
    this.fetchStudentAssignments();
    this.fetchAssignments();
  }

  toggleTotal() {
    this.isTotalActive = !this.isTotalActive;
    if (this.isTotalActive) {
      this.assignments = [];
      this.calculateTotalPoints();
      this.calculateReachablePointsForType();
    } else {
      this.updateAssignments();
    }
  }

  onSubjectChange(): void {
    this.isEditEnabled = false; // Reset edit mode
    this.updateAssignments();
  }
  isStage = true;

  onStageChange(studentId: number): void {
    this.getCalculatedGradeForStudent(studentId, this.isStage);
  }

  calculateCurrentSemester() {
    const today = new Date();
    const midFebruary = new Date(today.getFullYear(), 2, 15); // 1 is February (months are zero-indexed)

    this.currentSemester =
      today > midFebruary ? Semester['1.Semester'] : Semester['2.Semester'];
  }

  private allAssignmentsForCurrentSemester: Assignment[] = [];

  private fetchAssignments(): void {
    if (this.selectedSubject !== undefined) {
      this.pkSubject = this.selectedSubject;
      this.assignmentService
        .getAssignmentsBySubjectId(this.selectedSubject)
        .subscribe(
          (assignments) => {
            // Filtere zuerst nach dem aktuellen Semester
            const assignmentsForCurrentSemester = assignments.filter(
              (a) => a.semester === this.currentSemester
            );
            this.allAssignmentsForCurrentSemester =
              assignmentsForCurrentSemester;

            this.assignments = this.isTotalActive
              ? assignmentsForCurrentSemester
              : assignmentsForCurrentSemester.filter(
                  (a) => a.assignmentType === this.currentAssignment
                );
          },
          (error) => {
            console.error(`Error fetching assignments: ${error}`);
            this.assignments = [];
            // Setze auch allAssignmentsForCurrentSemester zurück
            this.allAssignmentsForCurrentSemester = [];
          }
        );
    } else {
      this.assignments = [];
      // Setze auch allAssignmentsForCurrentSemester zurück
      this.allAssignmentsForCurrentSemester = [];
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

  totalPointsPerStudent: { [studentId: number]: number } = {};
  totalPointsByType: {
    [studentId: number]: { [type in AssignmentType]?: number };
  } = {};

  getCurrentSemesterAsString(): string {
    return this.currentSemester === 0 ? 'FirstSemester' : 'SecondSemester';
  }

  calculateTotalPoints(): void {
    this.students?.forEach((student) => {
      this.totalPointsPerStudent[student.pkStudent] = 0;
      this.totalPointsByType[student.pkStudent] = {
        [AssignmentType.Test]: 0,
        [AssignmentType.Check]: 0,
        [AssignmentType.Homework]: 0,
        [AssignmentType.Framework]: 0,
      };
    });

    this.studentAssignments.forEach((studentAssignment) => {
      const points = studentAssignment.points;
      const studentId = studentAssignment.studentFkNavigation.pkStudent;
      const assignmentSemester =
        studentAssignment.assignmentFkNavigation.semester;
      const currentSemesterAsString = this.getCurrentSemesterAsString();
      const assignmentType =
        studentAssignment.assignmentFkNavigation.assignmentType.toString();

      const assignmentSubject =
        studentAssignment.assignmentFkNavigation.subjectFk;

      if (
        currentSemesterAsString === assignmentSemester.toString() &&
        assignmentSubject === this.pkSubject
      ) {
        if (this.totalPointsPerStudent.hasOwnProperty(studentId)) {
          if (!this.totalPointsByType[studentId]) {
            this.totalPointsByType[studentId] = {};
          }
          this.totalPointsPerStudent[studentId] += points;
          if (assignmentType === 'Test') {
            this.totalPointsByType[studentId][AssignmentType.Test] =
              (this.totalPointsByType[studentId][AssignmentType.Test] ?? 0) +
              points;
          } else if (assignmentType === 'Check') {
            this.totalPointsByType[studentId][AssignmentType.Check] =
              (this.totalPointsByType[studentId][AssignmentType.Check] ?? 0) +
              points;
          } else if (assignmentType === 'Homework') {
            this.totalPointsByType[studentId][AssignmentType.Homework] =
              (this.totalPointsByType[studentId][AssignmentType.Homework] ??
                0) + points;
          } else {
            this.totalPointsByType[studentId][AssignmentType.Framework] =
              (this.totalPointsByType[studentId][AssignmentType.Framework] ??
                0) + points;
          }
        }
      }
    });
  }
  // studentassigment --> reachablePoints z.b 10 --> AssignmentType
  //calculateReachablePointsForType

  totalReachablePointsByType: {
    [type in AssignmentType]?: number;
  } = {};

  calculateReachablePointsForType(): void {
    this.totalReachablePointsByType = {};
    this.allAssignmentsForCurrentSemester.forEach((studentAssignment) => {
      const assignmentType = studentAssignment.assignmentType;
      const reachablePoints = studentAssignment.reachablePoints;

      if (assignmentType === 0) {
        this.totalReachablePointsByType[AssignmentType.Test] =
          (this.totalReachablePointsByType[AssignmentType.Test] ?? 0) +
          reachablePoints;
      } else if (assignmentType === 1) {
        this.totalReachablePointsByType[AssignmentType.Check] =
          (this.totalReachablePointsByType[AssignmentType.Check] ?? 0) +
          reachablePoints;
      } else if (assignmentType === 2) {
        this.totalReachablePointsByType[AssignmentType.Homework] =
          (this.totalReachablePointsByType[AssignmentType.Homework] ?? 0) +
          reachablePoints;
      } else {
        this.totalReachablePointsByType[AssignmentType.Framework] =
          (this.totalReachablePointsByType[AssignmentType.Framework] ?? 0) +
          reachablePoints;
      }
    });
  }

  getAssignmentTypes(): number[] {
    return Object.keys(AssignmentType)
      .filter((key) => !isNaN(Number(key)))
      .map((key) => Number(key));
  }

  getPointsForType(studentId: number, type: number): number {
    const studentPoints = this.totalPointsByType[studentId];
    if (!studentPoints) return 0;

    const points = studentPoints[type as keyof typeof studentPoints];
    return points !== undefined ? points : 0;
  }

  getTotalReachablePointsForType(type: AssignmentType): number {
    const points = this.totalReachablePointsByType[type];

    if (!points) return 0;

    return points !== undefined ? points : 0;
  }

  getPercentagePointsForStudent(
    studentId: number,
    type: AssignmentType
  ): number {
    const weights = {
      [AssignmentType.Check]: 0.3,
      [AssignmentType.Homework]: 0.2,
      [AssignmentType.Framework]: 0.1,
      [AssignmentType.Test]: 0.4,
    };

    const points = this.getPointsForType(studentId, type);
    const reachablePoints = this.getTotalReachablePointsForType(type);

    // Check if reachablePoints is 0 to avoid division by zero
    if (reachablePoints === 0) {
      return 0;
    }

    const weight = weights[type];
    const percentage = ((points * weight) / reachablePoints) * 100;

    // Runde das Ergebnis auf eine Dezimalstelle und wandle es in eine Zahl um
    return Number(percentage.toFixed(0));
  }

  getTotalPointsForStudent(studentId: number): number {
    let totalReachablePoints = 0;

    for (const typeKey in AssignmentType) {
      const type = AssignmentType[typeKey as keyof typeof AssignmentType];
      totalReachablePoints += this.getPercentagePointsForStudent(
        studentId,
        type
      );
    }
    return totalReachablePoints;
  }

  getWeightsForType(type: AssignmentType): number {
    const weights = {
      [AssignmentType.Check]: 0.3,
      [AssignmentType.Homework]: 0.2,
      [AssignmentType.Framework]: 0.1,
      [AssignmentType.Test]: 0.4,
    };

    return weights[type];
  }

  getCalculatedGradeForStudent(studentId: number, flag: boolean): number {
    const totalPercentage = this.getTotalPointsForStudent(studentId);
    const gradingKey = this.getGradingKey(flag);

    if (totalPercentage >= gradingKey[0]) {
      return 1;
    } else if (totalPercentage >= gradingKey[1]) {
      return 2;
    } else if (totalPercentage >= gradingKey[2]) {
      return 3;
    } else if (totalPercentage >= gradingKey[3]) {
      return 4;
    } else {
      return 5;
    }
  }
  //points -->

  getGradingKey(flag: boolean): number[] {
    const gradiantKeySta = {
      1: 90,
      2: 80,
      3: 70,
      4: 60,
    };
    const gradiantKeySt = {
      1: 70,
      2: 60,
      3: 50,
      4: 35,
    };
    return flag ? Object.values(gradiantKeySta) : Object.values(gradiantKeySt);
  }
}
