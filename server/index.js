import { PrismaClient, Roles } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import url from 'url';
import querystring from 'querystring';
const app = express();
app.use(cors());
app.get('/search', async (req, res) => {
  const users = await fetchUsersSearch();
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
      students: true,
      Parents: true,
      teacher: true,
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
      students: true,
      teacher: true,
    },
    where: {
      OR: [{ role: Roles.STUDENT }, { role: Roles.TEACHER }],
    },
  });
  return [...usersWithRelatedRecords];
}
