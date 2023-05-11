import { PrismaClient, Roles } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import url from 'url';
import querystring from 'querystring';
import { userInfo } from 'os';
const app = express();

app.use(cors());
app.use(express.json());
app.get('/admin', async (req, res) => {
  const users = await fetchAllUsers();
  res.json(users);
});
app.post('/admin/addusers', async (req, res) => {
  const { roleData, userData } = req.body;
  let cu = await createUserWithRole(roleData, userData);
  if (cu == null)
    return res
      .status(500)
      .json({ message: 'User creation failed. Probably, login exists' });
  res.json(cu);
});
app.post('/admin/updateusers', async (req, res) => {
  const { roleData, userData, userId } = req.body;
  let uu = await updateUserWithRole(userData, roleData, userId);
  if (uu == null)
    return res.status(500).json({ message: 'User update failed.' });
  res.json(uu);
});
app.delete('/admin/deleteusers', async (req, res) => {
  const { userId, role } = req.body;
  console.log(userId);

  let success = await deleteUserCascade(userId, role);
  if (!success)
    return res.status(500).json({ message: 'User deletion failed.' });
  res.json({ success: success });
});
app.get('/search', async (req, res) => {
  const users = await fetchUsersSearch();
  res.json(users);
});

app.get('/journal', async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const query = querystring.parse(parsedUrl.query);
  const users = await fetchStudentsWithGrades(+query['class']);
  res.json(users);
});

app.get('/', async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const query = querystring.parse(parsedUrl.query);
  if (query['login'] === '' || query['password'] === '')
    return res.status(401).send({ message: 'Unauthorized' });
  let user = await fetchUsersLogin(query['login'], query['password']);
  if (user === null) return res.status(401).send({ message: 'Unauthorized' });
  res.json(user);
});

app.listen(3000, () => console.log('Server started on the port 3000'));
const prisma = new PrismaClient();

async function updateUserWithRole(userData, roleData, userId) {
  try {
    const currentUserRole = await prisma.users
      .findFirst({
        where: { id: userId },
      })
      .then((r) => r.role);
    console.log(currentUserRole);
    let table =
      currentUserRole === Roles.TEACHER
        ? 'Teachers'
        : currentUserRole === Roles.ADMIN
        ? 'Admins'
        : currentUserRole === Roles.STUDENT
        ? 'Students'
        : 'Parents';

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        ...userData,
        [table]: {
          update: {
            ...roleData,
          },
        },
      },
      include: { [table]: true },
    });

    console.log('User updated and associated with', table, ':', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user and associating with', ':', error);
    return {};
  }
}

async function deleteUserCascade(userId) {
  try {
    await prisma.users.delete({
      where: { id: userId },
    });

    console.log('User and associated records deleted successfully.');
    return true;
  } catch (error) {
    console.error('Error deleting user and associated records:', error);
    return false;
  }
}

async function createUserWithRole(roleData, userData) {
  try {
    let table =
      userData.role === Roles.TEACHER
        ? 'Teachers'
        : userData.role === Roles.ADMIN
        ? 'Admins'
        : userData.role === Roles.STUDENT
        ? 'Students'
        : 'Parents';
    const createdUser = await prisma.users.create({
      data: {
        ...userData,
        [table]: {
          create: { ...roleData },
        },
      },
      include: { [table]: true },
    });

    console.log('User created with associated', createdUser, ':', createdUser);
    return createdUser;
  } catch (error) {
    console.error('Error creating user with associated ', error);
    return null;
  }
}

async function fetchUsersLogin(login, password) {
  const usersWithRelatedRecords = await prisma.users.findFirst({
    include: {
      Students: true,
      Parents: true,
      Teachers: true,
      Admins: true,
    },
    where: {
      login: login,
      password: password,
    },
  });
  return usersWithRelatedRecords;
}

async function fetchUsersSearch() {
  const usersWithRelatedRecords = await prisma.users.findMany({
    include: {
      Students: true,
      Teachers: true,
    },
    where: {
      OR: [{ role: Roles.STUDENT }, { role: Roles.TEACHER }],
    },
  });
  return [...usersWithRelatedRecords];
}

async function fetchAllUsers() {
  const usersWithRelatedRecords = await prisma.users.findMany({
    include: {
      Students: true,
      Teachers: true,
      Parents: true,
      Admins: true,
    },
  });
  return [...usersWithRelatedRecords];
}
// async function createNewUserWithTeacher(userData, teacherData) {
//   try {
//     const createdUser = await prisma.users.create({
//       data: userData,
//     });

//     const createdTeacher = await prisma.teachers.create({
//       data: {
//         ...teacherData,
//         user_id: createdUser.id,
//       },
//     });

//     console.log('New user and associated teacher created:', {
//       user: createdUser,
//       teacher: createdTeacher,
//     });
//   } catch (error) {
//     console.error('Error creating new user and associated teacher:', error);
//   }
// }
async function fetchStudentsWithGrades(selectedClass) {
  const studentsWithGrades = await prisma.grades.findMany({
    include: {
      student: true,
      teacher: true,
      subject: true,
    },
    where: {
      student: {
        class: selectedClass,
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
  const listOfStudentsNames = [];
  const students = studentsWithGrades.reduce((acc, curr) => {
    const studentName = `${curr.student.surname} ${curr.student.name} ${curr.student.last_name}`;
    const { date, value, id } = curr;
    const student_id = curr.student_id;
    const teacher = {
      name: `${curr.teacher.surname} ${curr.teacher.name} ${curr.teacher.last_name}`,
      email: curr.teacher.email,
      phone: curr.teacher.phone,
      id: curr.teacher.id,
    };
    const subject = curr.subject.title;
    // Если студент уже есть в объекте, добавляем новую оценку в его массив
    if (studentName in acc) {
      acc[studentName].push({
        subject,
        date,
        value,
        teacher,
        student_id,
        id,
      });
    } else {
      // Иначе создаем новый массив оценок для студента
      acc[studentName] = [{ subject, date, value, teacher, student_id, id }];
      listOfStudentsNames.push(studentName);
    }
    return acc;
  }, {});
  return { students, listOfStudentsNames };
}

// Добавление оценки
app.post('/grades', async (req, res) => {
  try {
    const { value, date, studentId, teacherId, subjectId } = req.body;
    const grade = await prisma.grades.create({
      data: {
        value,
        date: new Date(date),
        student_id: studentId,
        teacher_id: teacherId,
        subject_id: subjectId,
      },
    });
    res.json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create grade' });
  }
});

// Удаление оценки по идентификатору
app.delete('/grades/:gradeId', async (req, res) => {
  try {
    const gradeId = parseInt(req.params.gradeId);
    const grade = await prisma.grades.delete({
      where: {
        id: gradeId,
      },
    });
    res.json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete grade' });
  }
});

// Обновление оценки по идентификатору
app.put('/grades/:gradeId', async (req, res) => {
  try {
    const gradeId = parseInt(req.params.gradeId);
    const { value, date } = req.body;
    const grade = await prisma.grades.update({
      where: {
        id: gradeId,
      },
      data: {
        value,
        date: new Date(date),
      },
    });
    res.json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update grade' });
  }
});
