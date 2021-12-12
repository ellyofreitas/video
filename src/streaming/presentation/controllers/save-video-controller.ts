import { MongoDBDriver } from '@shared/infra/mongodb/driver';
import { UUIDGenerator } from '@shared/main/adapters/uuid-generator';
import { MessageBrokerController } from '@shared/presentation/controllers';
import { Message } from '@shared/presentation/message-broker';
import { SaveVideo } from '@streaming/app/use-cases/save-video';
import { MongoDBVideoRepository } from '@streaming/infra/mongodb/repositories/video-repository';

export class SaveVideoController implements MessageBrokerController {
  async perform(message: Message<any>): Promise<void> {
    const uuidGenerator = new UUIDGenerator();
    const mongoDriver = await MongoDBDriver.getInstance();
    const videoRepository = new MongoDBVideoRepository(mongoDriver);
    const saveVideo = new SaveVideo(uuidGenerator, videoRepository);
    await saveVideo.perform(message);
  }
}
