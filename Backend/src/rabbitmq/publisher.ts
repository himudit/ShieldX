import { getChannel } from './connection';
import { QueueName } from './queues';

/**
 * Generic publish function.
 * Used by middleware or services to emit events.
 */
export async function publish<T>(
    queue: QueueName,
    message: T
): Promise<void> {
    const channel = await getChannel();

    // Ensure queue exists and is durable
    await channel.assertQueue(queue, {
        durable: true,
    });

    const payload = Buffer.from(JSON.stringify(message));

    const success = channel.sendToQueue(queue, payload, {
        persistent: true, // survives broker restart
    });

    if (!success) {
        console.warn('RabbitMQ send buffer is full.');
    }
}
