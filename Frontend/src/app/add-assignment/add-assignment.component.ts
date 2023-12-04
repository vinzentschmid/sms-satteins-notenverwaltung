import { Component } from '@angular/core';
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
    id: 0,
    creationDate: new Date(),
    reachablePoints: 0,
    type: AssignmentType.Test,
    semster: Semester['1.Semester'],
  };

  assignmentTypes = Object.values(AssignmentType);
  semesters = Object.values(Semester);

  constructor(private assignmentService: AssignmentService) {}

  onSubmit(): void {
    this.assignmentService.addAssignment(this.newAssignment);
    // You can reset the form or perform any other actions after adding the assignment.
  }
}
