import { Video } from '@admin/domain/entities/video';
import { VideoRepository } from '@admin/domain/video-repository';
import { MySQLRepository } from '@shared/infra/mysql/base';

export class MySQLVideoRepository
  extends MySQLRepository
  implements VideoRepository
{
  async save(video: Video): Promise<void> {
    await this.mysqlDriver.query(
      `
      insert into
        videos (id, storageKey, title, description)
      values
        (?, ?, ?, ?)
    `,
      [video.id, video.storageKey, video.title, video.description]
    );
    if (video.tags.length) await this.saveTags(video);
  }

  private async saveTags(video: Video) {
    const tags = video.tags.map((tag) => ({
      videoId: video.id,
      tag: tag.name,
    }));
    await this.mysqlDriver.query(
      `
      insert into
        video_tags (videoId, tag)
      values
        ?
    `,
      [tags.map(Object.keys)]
    );
  }
}
