/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpController } from '@shared/presentation/controllers';
import { internalError, Route, Response } from '@shared/presentation/http';
import { IncomingMessage, ServerResponse, IncomingHttpHeaders } from 'http';
import { match } from './route-matcher';

type KeyValue = { [key: string]: string };

export const translateResponse = (response: Response, res: ServerResponse) => {
  res.writeHead(response.statusCode, response.headers);
  return res.write(
    typeof response.data === 'object'
      ? JSON.stringify(response.data)
      : String(response.data)
  );
};

const parseHeaders = (headers: IncomingHttpHeaders) =>
  Object.entries(headers).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key.toLowerCase()]: Array.isArray(value) ? value.join(',') : value,
    }),
    {}
  );

const adaptBody = async (request: IncomingMessage) => {
  const isJSON =
    request.headers?.['content-type']?.includes('application/json');
  const body = await new Promise<Buffer>((resolve, reject) => {
    const buffers = [];
    return request
      .on('data', (chunk) => buffers.push(chunk))
      .on('end', () => resolve(Buffer.concat(buffers)))
      .on('error', reject);
  });
  return isJSON ? JSON.parse(body.toString('utf-8')) : body;
};

function adaptHandler(controller: HttpController, params: KeyValue) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<any> => {
    try {
      const request = {
        raw: req,
        body: await adaptBody(req),
        params,
        headers: parseHeaders(req.headers),
        adapter: 'server',
      };
      const response = await controller.perform(request);
      return translateResponse(response, res);
    } catch (error) {
      console.error(error);
      return translateResponse(internalError(), res);
    } finally {
      res.end();
    }
  };
}

export function matchHandler(method: string, path: string, routes: Route[]) {
  const { controller, params } = match(method, path, routes);
  return adaptHandler(controller, params);
}
