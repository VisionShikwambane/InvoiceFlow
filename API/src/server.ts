import express, { Application } from 'express';
import db from './models';
import userRoutes from './routes/user.routes';
import invoiceRoutes from './routes/invoice.routes';
import emailRoutes from './routes/email.routes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Application = express();
const PORT = 3000;

// Configure body-parser with a higher limit
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));

app.use(cors());
app.use('/api', userRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', emailRoutes);

app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected!');
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
