import { MongoDBDriver } from '@shared/infra/mongodb/driver';
import { HttpController } from '@shared/presentation/controllers';
import {
  ok,
  Request,
  Response,
  translateControllerError,
} from '@shared/presentation/http';
import { WatchVideo } from '@streaming/app/use-cases/watch-video';
import { MongoDBVideoRepository } from '@streaming/infra/mongodb/repositories/video-repository';

export class WatchVideoController implements HttpController {
  @translateControllerError()
  async perform(request: Request<any>): Promise<Response<any>> {
    const mongodbDriver = await MongoDBDriver.getInstance();
    const videoRepository = new MongoDBVideoRepository(mongodbDriver);
    const watchVideo = new WatchVideo(videoRepository);
    const output = await watchVideo.perform(request.params?.id);
    return ok(output);
  }
}
