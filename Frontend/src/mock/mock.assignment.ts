import {
  Assignment,
  AssignmentType,
  Semester,
} from 'src/model/model.assignment';

export const mockAssignment1: Assignment = {
  id: 0,
  creationDate: new Date('2020-01-01'),
  reachablePoints: 20,
  type: AssignmentType.Test,
  semster: Semester['1.Semester'],
};
