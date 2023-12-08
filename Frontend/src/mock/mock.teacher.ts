import { Teacher } from 'src/model/model.teacher';
import { mockClass, mockClass1 } from './mock.class';

export const mockTeacher1: Teacher = {
  id: 1,
  firstName: 'Max',
  lastName: 'Mustermann',
  email: 'max.musertman@gmail.at',
  password: '1234',
  classes: [mockClass, mockClass1],
};
