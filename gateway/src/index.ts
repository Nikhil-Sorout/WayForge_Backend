import dotenv from 'dotenv';
import express from 'express';
import proxy from 'express-http-proxy';
import { logger } from '../../src/utils/logger';

dotenv.config();
logger.info(process.env.GATEWAY_PORT);
const port = process.env.GATEWAY_PORT || 4000;

const app = express();
app.use(express.json());

// proxy auth routes
app.use('/auth', proxy(`http://localhost:4001`));

// test api
app.use('/', (req, res) => {
  return res.status(200).json({ message: 'Gateway is working fine' });
});

app.listen(port, () => {
  logger.info(`Gateway is running on: ${port}`);
});
