import { VideoRepository } from '@streaming/domain/repositories/video-repository';

export class ListVideos {
  constructor(readonly videoRepository: VideoRepository) {}

  async perform() {
    return await this.videoRepository.list();
  }
}
