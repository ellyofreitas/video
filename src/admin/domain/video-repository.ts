import { Video } from './entities/video';

export interface VideoRepository {
  save(video: Video): Promise<void>;
}
