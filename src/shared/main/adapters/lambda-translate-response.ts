import { ALBResult } from 'aws-lambda';
import { Response } from '../../presentation/http';

export const translateResponse = (response: Response): ALBResult => ({
  statusCode: response.statusCode,
  body:
    typeof response.data === 'object'
      ? JSON.stringify(response.data)
      : String(response.data),
  ...(response.headers && { headers: { ...response.headers } }),
});
