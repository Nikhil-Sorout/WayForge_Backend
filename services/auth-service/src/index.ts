import express from 'express';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import { logger } from '../../../src/utils/logger';

dotenv.config();
const port = process.env.PORT!;

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.listen(port, () => {
  logger.info('Auth service is running on: ', port);
});
