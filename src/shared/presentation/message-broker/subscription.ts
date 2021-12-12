import { MessageBrokerController } from '../controllers';

export interface Subscription {
  topic: string;
  controller: MessageBrokerController;
}

export const defineSubscriptions = (
  subscriptions: Subscription[]
): Subscription[] => subscriptions;
