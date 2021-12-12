import { CreateVideo } from '@admin/app/use-cases/create-video';
import { FSStorageGateway } from '@admin/infra/gateway/fs-storage-gateway';
import { MySQLVideoRepository } from '@admin/infra/mysql/repositories/video-repository';
import { KafkaClient } from '@shared/infra/kafka/client';
import { MySQLDriver } from '@shared/infra/mysql/driver';
import { UUIDGenerator } from '@shared/main/adapters/uuid-generator';
import { HttpController } from '@shared/presentation/controllers';
import {
  created,
  Request,
  Response,
  translateControllerError,
} from '@shared/presentation/http';

export class CreateVideoController implements HttpController {
  @translateControllerError()
  async perform(request: Request<any>): Promise<Response<any>> {
    const mysqlDriver = MySQLDriver.getInstance();
    const createVideoRepository = new MySQLVideoRepository(mysqlDriver);
    const uuidGenerator = new UUIDGenerator();
    const storageGateway = new FSStorageGateway();
    const messageBroker = new KafkaClient();
    const createVideo = new CreateVideo(
      uuidGenerator,
      createVideoRepository,
      storageGateway,
      messageBroker
    );
    const result = await createVideo.perform(request.body);
    return created(result, `/videos/${result.id}`);
  }
}
