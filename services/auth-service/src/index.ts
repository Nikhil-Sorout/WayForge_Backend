import express from 'express';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import { logger } from '../../../src/utils/logger';

dotenv.config();
logger.info(process.env.AUTH_SERVICE_PORT);
const port = process.env.AUTH_SERVICE_PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

// test api
// app.use('/', (req, res)=>{
//     return res.status(200).json({message: "Auth service is up"});
// })

app.listen(port, () => {
  logger.info(`Auth service is running on: ${port}`);
});
