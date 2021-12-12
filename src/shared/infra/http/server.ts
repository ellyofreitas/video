import 'reflect-metadata';
import http, { IncomingMessage, ServerResponse } from 'http';
import { port, host } from '@shared/main/config/server';
import { NotRouteMatched } from '@shared/main/adapters/route-matcher';
import {
  matchHandler,
  translateResponse,
} from '@shared/main/adapters/server-route-matcher';
import { internalError, notFound } from '@shared/presentation/http';
import routes from './routes';

async function requestHandler(req: IncomingMessage, res: ServerResponse) {
  try {
    const { pathname } = new URL(req.url, 'http://localhost');
    const handler = matchHandler(req.method, pathname, routes);
    const response = await handler(req, res);
    return response;
  } catch (error) {
    if (error instanceof NotRouteMatched)
      return translateResponse(notFound(), res);
    console.error(error);
    return translateResponse(internalError(), res);
  }
}

const server = http.createServer(requestHandler);

const [cmd] = process.argv.slice(2, process.argv.length);
if (cmd === '--listen')
  server.listen(port, () =>
    console.info(`server running at http://${host}:${port}`)
  );

export { server };
