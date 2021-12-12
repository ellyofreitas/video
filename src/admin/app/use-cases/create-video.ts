import { UniqueIdGenerator } from '@shared/app/contracts';
import { Video } from '@admin/domain/entities/video';
import { StorageGateway } from '@admin/domain/gateway/storage';
import { VideoRepository } from '@admin/domain/video-repository';
import { ValidationError } from '@shared/domain/errors';
import { TOPIC } from '@admin/domain/enums';
import { MessageBroker } from '../contracts/message-broker';

export class CreateVideo {
  constructor(
    readonly uniqueIdGenerator: UniqueIdGenerator,
    readonly videoRepository: VideoRepository,
    readonly storageGateway: StorageGateway,
    readonly messageBroker: MessageBroker
  ) {}

  async perform(input) {
    const video = new Video(
      this.uniqueIdGenerator.generate(),
      input.storageKey,
      input.title,
      input.description
    );
    for (const tag of input.tags) video.addTag(tag);
    const hasVideoStorage = await this.storageGateway.hasKey(video.storageKey);
    if (!hasVideoStorage) throw new ValidationError('no video storage');
    await this.videoRepository.save(video);
    await this.messageBroker.sendMessage(TOPIC.VIDEO_CREATED, video);
    return video;
  }
}
