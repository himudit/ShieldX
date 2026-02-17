/**
 * Central registry for all RabbitMQ queues
 * Never hardcode queue names anywhere else.
 */

import { env } from '../config/env';

export const QUEUES = {
    API_LOGS: env.RABBITMQ_QUEUE || 'api_logs_queue',
} as const;

/**
 * Strongly typed queue name union
 * Prevents accidental string usage.
 */
export type QueueName = (typeof QUEUES)[keyof typeof QUEUES];
