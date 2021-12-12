import { Message } from '../message-broker';

export interface MessageBrokerController {
  perform(message: Message): Promise<void>;
}
