import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.get('/', async (req, res) => {
  let ans = await main();
  res.json(ans);
});
app.listen(3000, () => console.log('Server started on the port 3000'));

const prisma = new PrismaClient();

async function main() {
  const usersWithRelatedRecords = await prisma.users.findMany({
    include: {
      students: true,
      Parents: true,
      teacher: true,
    },
  });
  // console.log(usersWithRelatedRecords);
  return usersWithRelatedRecords;
}
