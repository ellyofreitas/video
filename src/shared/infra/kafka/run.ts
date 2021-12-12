import { Subscription } from '@shared/presentation/message-broker';
import { EachMessagePayload } from 'kafkajs';
import { KafkaClient } from './client';
import subscriptions from './subscriptions';

function adaptHandler({ controller }: Subscription) {
  return async ({ topic, message: topicMessage }: EachMessagePayload) => {
    try {
      const message = {
        sender: topic,
        data: JSON.parse(topicMessage.value.toString('utf-8')),
      };
      console.log(message);
      await controller.perform(message);
    } catch (error) {
      console.error(error);
    }
  };
}

(async () => {
  const kafka = new KafkaClient();
  const consumer = kafka.client.consumer({ groupId: 'run' });
  const topics = [...new Set(subscriptions.map(({ topic }) => topic))];
  for (const topic of topics) await consumer.subscribe({ topic });
  return await Promise.all(
    subscriptions.map(
      async (subscription) =>
        await consumer.run({
          eachMessage: adaptHandler(subscription),
        })
    )
  );
})().catch(console.error);
