import { ROLES } from './ROLES.js';

const TEACHER_DEFAULT = {
  last_name: '',
  name: '',
  surname: '',
  phone: '',
  email: '',
  //   subject_id: '',
};

const STUDENT_DEFAULT = {
  last_name: '',
  name: '',
  surname: '',
  phone: '',
};

const ADMINS_DEFAULT = {
  last_name: '',
  name: '',
  surname: '',
  phone: '',
};

const PARENTS_DEFAULT = {
  last_name: '',
  name: '',
  surname: '',
  phone: '',
};

const SELECTED_DEFAULT = {
  login: '',
  password: '',
  role: ROLES.TEACHER,
  id: '',
};

export {
  TEACHER_DEFAULT,
  STUDENT_DEFAULT,
  ADMINS_DEFAULT,
  PARENTS_DEFAULT,
  SELECTED_DEFAULT,
};
