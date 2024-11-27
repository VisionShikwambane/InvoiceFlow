import express, { Application, Request, Response } from 'express';
import db from './models';

const app: Application = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the TypeScript Sequelize API!');
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected!');
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
