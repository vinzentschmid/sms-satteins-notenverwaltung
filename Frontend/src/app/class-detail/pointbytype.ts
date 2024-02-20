import { AssignmentType } from 'src/model/model.assignment';

export interface TotalPointsByTypeAndSemester {
  [studentId: number]: { [type in AssignmentType]?: number };
}
