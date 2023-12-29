import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Assignment,
  AssignmentType,
  Semester,
} from 'src/model/model.assignment';
import { AssignmentService } from 'src/service/service.assignment';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss'],
})
export class AddAssignmentComponent {
  newAssignment: Assignment = {
    assignmentPk: 0,
    creationDate: new Date(),
    reachablePoints: 0,
    type: AssignmentType.Test,
    semster: Semester['1.Semester'],
  };

  subjectId!: number;

  assignmentTypes = Object.values(AssignmentType);
  semesters = Object.values(Semester);

  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute
  ) {}

  onInit(): void {
    this.route.params.subscribe((params) => {
      // Retrieve the subject_id parameter from the route
      this.subjectId = +params['subject_id'];
    });
  }

  onSubmit(): void {
    //this.assignmentService.addAssignment(this.newAssignment, this.subjectId);
    // You can reset the form or perform any other actions after adding the assignment.
  }
}
