import { defineRoutes } from '@shared/presentation/http';
import { CreateVideoController } from '../controllers/create-video-controller';
import { UploadVideoController } from '../controllers/upload-video-controller';

export default defineRoutes([
  {
    controller: new CreateVideoController(),
    resource: '/videos',
    method: 'post',
  },
  {
    controller: new UploadVideoController(),
    resource: '/videos/upload',
    method: 'post',
  },
]);
