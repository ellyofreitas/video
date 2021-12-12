/* eslint-disable @typescript-eslint/no-unused-vars */
import { ALBEvent, ALBResult, Context } from 'aws-lambda';
import { HttpController } from '@shared/presentation/controllers';
import { internalError, Route } from '@shared/presentation/http';
import { translateResponse } from './lambda-translate-response';
import { match } from './route-matcher';

type KeyValue = { [key: string]: string };

const parseHeaders = (headers: KeyValue) =>
  Object.entries(headers).reduce(
    (acc, [key, value]) => ({ ...acc, [key.toLowerCase()]: value }),
    {}
  );

const adaptBody = (event: ALBEvent) => {
  const headers = parseHeaders(event.headers);
  const isJSON = headers?.['content-type']?.includes('application/json');
  const body = isJSON ? JSON.parse(event.body) : event.body;
  return body;
};

function adaptHandler(controller: HttpController, params: KeyValue) {
  return async (event: ALBEvent, context?: Context): Promise<ALBResult> => {
    try {
      const request = {
        body: adaptBody(event),
        params,
        headers: parseHeaders(event.headers),
        raw: event,
        adapter: 'lambda',
      };
      const response = await controller.perform(request);
      // return {
      //   statusCode: response.statusCode,
      //   body: JSON.stringify(response.data),
      //   headers: { ...response.headers, 'content-type': 'application/json' },
      // };
      return translateResponse(response);
    } catch (error) {
      console.error(error);
      return translateResponse(internalError());
    }
  };
}

export function matchHandler(method: string, path: string, routes: Route[]) {
  const { controller, params } = match(method, path, routes);
  return adaptHandler(controller, params);
}
