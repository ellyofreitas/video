import { Request, Response } from '@shared/presentation/http';

export interface HttpController {
  perform(request: Request): Promise<Response<any>>;
}
