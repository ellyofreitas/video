export class Message<T = any> {
  sender?: string;

  data: T;
}
