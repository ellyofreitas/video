export class Response<T = any> {
  constructor(
    readonly statusCode: number,
    readonly data: T,
    readonly headers: any = {}
  ) {
    if (!this.headers['content-type'])
      this.headers['content-type'] = 'application/json';
  }
}

export const ok = <T = any>(data: T) => new Response<T>(200, data);
export const created = <T = any>(data: T, location?: string) =>
  new Response<T>(201, data, { location });
export const internalError = () =>
  new Response(500, { message: 'internal error' });
export const badRequest = (message?: string) =>
  new Response(400, { message: message ?? 'validation error' });
export const notFound = (message?: string) =>
  new Response(404, { message: message ?? 'not found' });
export const conflict = (message?: string) =>
  new Response(409, { message: message ?? 'conflict' });
