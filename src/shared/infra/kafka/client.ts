import { Kafka } from 'kafkajs';
import { MessageBroker } from '@admin/app/contracts/message-broker';

export class KafkaClient implements MessageBroker {
  readonly client: Kafka;

  constructor() {
    this.client = new Kafka({
      brokers: () => [
        '192.168.18.64:19092',
        '192.168.18.64:29092',
        '192.168.18.64:39092',
      ],
    });
  }

  async sendMessage<T = any>(topic: string, message: T): Promise<void> {
    const producer = this.client.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    await producer.disconnect();
  }
}
