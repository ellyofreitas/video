import { TOPIC } from '@admin/domain/enums';
import { defineSubscriptions } from '@shared/presentation/message-broker';
import { SaveVideoController } from '../controllers/save-video-controller';

export default defineSubscriptions([
  {
    topic: TOPIC.VIDEO_CREATED,
    controller: new SaveVideoController(),
  },
]);
