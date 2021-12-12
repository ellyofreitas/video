export class Request<T = any> {
  body: T;

  params: { [key: string]: string };

  raw: any;

  adapter: string;
}
