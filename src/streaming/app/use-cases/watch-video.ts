import { VideoRepository } from '@streaming/domain/repositories/video-repository';

export class WatchVideo {
  constructor(readonly videoRepository: VideoRepository) {}

  async perform(id) {
    const video = await this.videoRepository.getById(id);
    return video;
  }
}
