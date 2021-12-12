import { HttpController } from '../controllers/http-controller';

export interface Route {
  method: string;
  resource: string;
  controller: HttpController;
}
