import { Worker } from 'bullmq';
import { logger } from '../src/utils/logger';

const worker = new Worker(
  'emails',
  async (job) => {
    logger.info('Sending email: ', job.data);
    // further integration of nodemailer or external services
  },
  { connection: { host: 'localhost', port: 6379 } }
);

worker.on('completed', (job) => {
  logger.info(`Email job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  logger.info(`Email job ${job?.id} failed: ${err.message}`);
});
