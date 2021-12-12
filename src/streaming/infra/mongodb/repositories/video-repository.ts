import { MongoDBRepository } from '@shared/infra/mongodb/base';
import { Video } from '@streaming/domain/entities/video';
import { VideoRepository } from '@streaming/domain/repositories/video-repository';

export class MongoDBVideoRepository
  extends MongoDBRepository
  implements VideoRepository
{
  async list(): Promise<Video[]> {
    const res = await this.mongodbDriver.list('videos');
    const videos = res.map((item) => {
      const video = new Video(
        item._id.toString(),
        item.videoId,
        item.storageKey,
        item.title,
        item.description
      );
      for (const tag of item.tags) video.addTag(tag.name);
      return video;
    });
    return videos;
  }

  async getById(id: string): Promise<Video> {
    const res = await this.mongodbDriver.getById('videos', id);
    const video = new Video(
      res._id.toString(),
      res.videoId,
      res.storageKey,
      res.title,
      res.description
    );
    for (const tag of res.tags) video.addTag(tag.name);
    return video;
  }

  async save(video: Video): Promise<void> {
    await this.mongodbDriver.insert('videos', video);
  }
}
