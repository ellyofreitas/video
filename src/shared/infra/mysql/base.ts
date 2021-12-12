import { MySQLDriver } from './driver';

export class MySQLRepository {
  constructor(readonly mysqlDriver: MySQLDriver) {}
}
