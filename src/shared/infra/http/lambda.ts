import 'reflect-metadata';
import { ALBEvent, ALBResult } from 'aws-lambda';
import {
  matchHandler,
  translateResponse,
} from '@shared/main/adapters/lambda-adapter';
import { internalError, notFound } from '@shared/presentation/http';
import { NotRouteMatched } from '@shared/main/adapters/route-matcher';
import routes from './routes';

export async function handler(event: ALBEvent): Promise<ALBResult> {
  console.info('event: %j', event);
  try {
    const responseHandler = matchHandler(event.httpMethod, event.path, routes);
    const response = await responseHandler(event);
    return response;
  } catch (error) {
    if (error instanceof NotRouteMatched) return translateResponse(notFound());
    console.error(error);
    return translateResponse(internalError());
  }
}
