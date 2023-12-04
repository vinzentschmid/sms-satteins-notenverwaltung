import { Class } from 'src/model/model.class';
import { mockSubject1, mockSubject2 } from './mock.subjects';

export const mockClass: Class = {
  id: 1,
  name: '1A',
  year: new Date('2020-01-01'),
  subjects: [mockSubject1, mockSubject2],
};
export const mockClass1: Class = {
  id: 3,
  name: '2A',
  year: new Date('2022-01-01'),
  subjects: [mockSubject2],
};
