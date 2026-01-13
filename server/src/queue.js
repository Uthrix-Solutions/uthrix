import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL);
export const applicationsQueue = new Queue('applications', { connection });

export async function enqueueApplicationReceived(payload) {
  await applicationsQueue.add('application.received', payload, {
    attempts: 5,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true,
    removeOnFail: false,
  });
}
