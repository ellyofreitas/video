import { MongoDBDriver } from './driver';

export class MongoDBRepository {
  constructor(readonly mongodbDriver: MongoDBDriver) {}
}
