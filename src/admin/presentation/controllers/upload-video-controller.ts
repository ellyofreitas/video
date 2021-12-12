import { UploadVideo } from '@admin/app/use-cases/upload-video';
import { FileType } from '@admin/infra/adapters/file-type';
import { FSStorageGateway } from '@admin/infra/gateway/fs-storage-gateway';
import { UUIDGenerator } from '@shared/main/adapters/uuid-generator';
import { HttpController } from '@shared/presentation/controllers';
import {
  ok,
  Request,
  Response,
  translateControllerError,
} from '@shared/presentation/http';

const resolveBody = (request: Request) => {
  if (request.adapter === 'lambda') {
    const { isBase64Encoded } = request.raw;
    return Buffer.from(request.raw.body, isBase64Encoded ? 'base64' : 'utf-8');
  }
  return request.body;
};

export class UploadVideoController implements HttpController {
  @translateControllerError()
  async perform(request: Request<any>): Promise<Response<any>> {
    const fileType = new FileType();
    const uuidGenerator = new UUIDGenerator();
    const storageGateway = new FSStorageGateway();
    const uploadVideo = new UploadVideo(
      uuidGenerator,
      storageGateway,
      fileType
    );
    const result = await uploadVideo.perform(resolveBody(request));
    return ok(result);
  }
}
