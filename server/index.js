import { PrismaClient, Roles } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import url from 'url';
import querystring from 'querystring';
const app = express();

app.use(cors());

app.get('/admin', async (req, res) => {
  const users = await fetchAllUsers();
  res.json(users);
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
    const { date, value } = curr;
    const teacher = {
      name: `${curr.teacher.surname} ${curr.teacher.name} ${curr.teacher.last_name}`,
      email: curr.teacher.email,
      phone: curr.teacher.phone,
    };
    const subject = curr.subject.title;
    // Если студент уже есть в объекте, добавляем новую оценку в его массив
    if (studentName in acc) {
      acc[studentName].push({ subject, date, value, teacher });
    } else {
      // Иначе создаем новый массив оценок для студента
      acc[studentName] = [{ subject, date, value, teacher }];
      listOfStudentsNames.push(studentName);
    }
    return acc;
  }, {});
  return { students, listOfStudentsNames };
}
