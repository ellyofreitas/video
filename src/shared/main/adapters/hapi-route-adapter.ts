import * as Boom from '@hapi/boom';
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { HttpController } from '@shared/presentation/controllers/http-controller';
import { Route } from '@shared/presentation/http/route';

function adaptHandler(controller: HttpController) {
  return async (req: Request, h: ResponseToolkit) => {
    try {
      const request = {
        body: req.payload,
        params: req.params,
        raw: req.raw.req,
        adapter: 'server',
        headers: req.headers,
      };
      const response = await controller.perform(request);
      const reply = h.response(response.data).code(response.statusCode);
      for (const headerName in response.headers)
        reply.header(headerName, response.headers[headerName]);
      return reply;
    } catch (error) {
      console.error(error);
      throw Boom.internal();
    }
  };
}

export function adaptRoute(app: Server, route: Route) {
  app.route({
    method: route.method,
    path: route.resource,
    handler: adaptHandler(route.controller),
  });
}
