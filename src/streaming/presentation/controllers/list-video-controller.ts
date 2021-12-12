import { MongoDBDriver } from '@shared/infra/mongodb/driver';
import { HttpController } from '@shared/presentation/controllers';
import {
  ok,
  Request,
  Response,
  translateControllerError,
} from '@shared/presentation/http';
import { ListVideos } from '@streaming/app/use-cases/list-videos';
import { MongoDBVideoRepository } from '@streaming/infra/mongodb/repositories/video-repository';

export class ListVideosController implements HttpController {
  @translateControllerError()
  async perform(request: Request<any>): Promise<Response<any>> {
    const mongodbDriver = await MongoDBDriver.getInstance();
    const videoRepository = new MongoDBVideoRepository(mongodbDriver);
    const listVideos = new ListVideos(videoRepository);
    const output = await listVideos.perform();
    return ok(output);
  }
}
