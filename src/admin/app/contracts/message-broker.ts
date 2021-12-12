export interface MessageBroker {
  sendMessage<T = any>(topic: string, message: T): Promise<void>;
}
