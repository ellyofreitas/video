import mysql, { Pool } from 'mysql2/promise';

export class MySQLDriver {
  private pool: Pool;

  private static instance: MySQLDriver | undefined;

  private constructor(
    host = 'localhost',
    database = 'video',
    user = 'root',
    password = 'root'
  ) {
    this.pool = mysql.createPool({
      host,
      database,
      user,
      password,
    });
  }

  static getInstance() {
    if (!this.instance) this.instance = new this();
    return this.instance;
  }

  async query<T = any>(sql: string, bindings?: any) {
    const [rows] = await this.pool.query<[]>(sql, bindings);

    return rows as T[];
  }

  async transaction() {
    const connection = await this.pool.getConnection();
    await connection.beginTransaction();
    return connection;
  }
}
