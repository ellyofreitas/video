import { defineRoutes } from '@shared/presentation/http';
import { ListVideosController } from '../controllers/list-video-controller';
import { WatchVideoController } from '../controllers/watch-video-controller';

export default defineRoutes([
  {
    controller: new WatchVideoController(),
    method: 'get',
    resource: '/videos/{id}',
  },
  {
    controller: new ListVideosController(),
    method: 'get',
    resource: '/videos',
  },
]);
