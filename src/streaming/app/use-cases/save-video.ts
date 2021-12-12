import { UniqueIdGenerator } from '@shared/app/contracts';
import { VideoRepository } from '@admin/domain/video-repository';
import { Video } from '@streaming/domain/entities/video';

export class SaveVideo {
  constructor(
    readonly uniqueIdGenerator: UniqueIdGenerator,
    readonly videoRepository: VideoRepository
  ) {}

  async perform(input) {
    const video = new Video(
      this.uniqueIdGenerator.generate(),
      input.id,
      input.storageKey,
      input.title,
      input.description
    );
    for (const tag of input.tags) video.addTag(tag);
    await this.videoRepository.save(video);
  }
}
