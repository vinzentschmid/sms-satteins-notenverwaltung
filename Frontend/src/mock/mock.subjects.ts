import { Subject } from 'src/model/model.subject';
import { mockAssignment1 } from './mock.assignment';

export const mockSubject1: Subject = {
  id: 1,
  name: 'Math',
  assignments: [mockAssignment1, mockAssignment1],
};

export const mockSubject2: Subject = {
  id: 2,
  name: 'English',
  assignments: [],
};
