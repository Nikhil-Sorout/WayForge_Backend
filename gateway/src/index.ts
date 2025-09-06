import express from 'express';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';
import { logger } from '../../src/utils/logger';

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());

// proxy auth routes
app.use('/auth', proxy(`http://localhost:4001`));

app.listen(port, () => {
  logger.info('Gateway is running on: ', port);
});
