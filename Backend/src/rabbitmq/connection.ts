import amqp, { Channel, Connection } from 'amqplib';
import { env } from '../config/env';

let connection: any = null;
let channel: any = null;

/**
 * Creates and returns a singleton channel instance.
 */
export async function getChannel(): Promise<Channel> {
    // Return existing channel if already established
    if (channel) {
        return channel;
    }

    const RABBITMQ_URL = env.RABBITMQ_URL;
    const PREFETCH = env.RABBITMQ_PREFETCH || 10;

    if (!RABBITMQ_URL) {
        throw new Error('RABBITMQ_URL is not defined in environment variables');
    }

    try {
        // 1. Ensure connection exists
        if (!connection) {
            const newConn = await amqp.connect(RABBITMQ_URL);

            newConn.on('error', (err: any) => {
                console.error('RabbitMQ connection error:', err);
                connection = null;
                channel = null;
            });

            newConn.on('close', () => {
                console.warn('RabbitMQ connection closed. Resetting channel.');
                connection = null;
                channel = null;
            });

            connection = newConn;
        }

        // Use a local reference to satisfy TypeScript narrowing after await
        const activeConn = connection;
        if (!activeConn) {
            throw new Error('Failed to establish RabbitMQ connection');
        }

        // 2. Ensure channel exists
        if (!channel) {
            const newChannel = await activeConn.createChannel();

            newChannel.on('error', (err: any) => {
                console.error('RabbitMQ channel error:', err);
                channel = null;
            });

            newChannel.on('close', () => {
                console.warn('RabbitMQ channel closed.');
                channel = null;
            });

            // Important for controlling load on consumers
            await newChannel.prefetch(PREFETCH);

            channel = newChannel;
        }

        const activeChannel = channel;
        if (!activeChannel) {
            throw new Error('Failed to create RabbitMQ channel');
        }

        console.log('✅ RabbitMQ connected');
        return activeChannel;
    } catch (error) {
        console.error('❌ Failed to connect to RabbitMQ:', error);
        connection = null;
        channel = null;
        throw error;
    }
}

/**
 * Closes the RabbitMQ connection and channel.
 */
export async function closeConnection(): Promise<void> {
    try {
        if (channel) {
            await channel.close();
        }
        if (connection) {
            await connection.close();
        }
    } catch (error) {
        console.error('Error closing RabbitMQ connection:', error);
    } finally {
        channel = null;
        connection = null;
    }
}
