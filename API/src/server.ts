import express, { Application, Request, Response } from 'express';
import db from './models';
import userRoutes from './routes/user.routes';
import invoiceRoutes from './routes/invoice.routes';

const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/invoice', invoiceRoutes);



app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected!');
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
