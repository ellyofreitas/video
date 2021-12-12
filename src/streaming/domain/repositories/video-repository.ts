import { Video } from '../entities/video';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  getById(id: string): Promise<Video>;
  list(): Promise<Video[]>;
}
