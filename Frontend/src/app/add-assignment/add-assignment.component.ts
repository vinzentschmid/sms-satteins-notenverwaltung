import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentType, Semester } from 'src/model/model.assignment';
import { SaveAssignment } from 'src/model/model.saveassignment';

import { AssignmentService } from 'src/service/service.assignment';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss'],
})
export class AddAssignmentComponent implements OnInit {
  subjectId!: number;
  classId!: number;
  newAssignment: SaveAssignment;
  assignmentTypes = ['Test', 'Check', 'Homework', 'Framework'];
  semesters = ['FirstSemester', 'SecondSemester'];

  constructor(
    private assignmentService: AssignmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router // Inject the Router
  ) {
    this.newAssignment = new SaveAssignment(
      new Date(),
      0,
      0, // Will be set in ngOnInit
      'Test',
      'FirstSemester'
    );
  }

  ngOnInit() {
    this.subjectId = Number(
      this.activatedRoute.snapshot.paramMap.get('subject_id')
    );
    this.classId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.newAssignment.subjectFk = this.subjectId;
  }

  onSubmit(): void {
    this.assignmentService.createAssignment(this.newAssignment).subscribe({
      next: () => {
        this.router.navigate(['/class', this.classId]);
      },
      error: (error) => console.error('Error creating assignment:', error),
    });
  }
}
