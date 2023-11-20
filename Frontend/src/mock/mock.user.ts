import { User, userRole } from 'src/model/model.user';
import { mockClass } from '../mock/mock.class';

export const mockUser1: User = {
  id: 1,
  name: 'Max Mustermann',
  email: 'max.mustermann@schule.de',
  classes: [mockClass],
  role: userRole.Teacher,
};

export const mockUser2: User = {
  id: 2,
  name: 'Max Musterfrau',
  email: 'max.musterfrau@schule.de',
  classes: [mockClass],
  role: userRole.Student,
};
