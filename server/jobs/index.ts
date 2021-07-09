import pino from 'pino';
import { CronJob } from 'cron';

const logger = pino();

export default async function startCronJobs() {
  var job = new CronJob(
    '*/5 * * * * *',
    function () {
      logger.info('You will see this message every 5 seconds');
    },
    null,
    true,
    'Australia/Sydney'
  );
  // job.start();
}
