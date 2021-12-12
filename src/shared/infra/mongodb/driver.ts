import { MongoClient, Db, ObjectId } from 'mongodb';

export class MongoDBDriver {
  private client: MongoClient;

  db: Db;

  private static instance: MongoDBDriver | undefined;

  private constructor(url = 'mongodb://localhost:27017', db = 'video') {
    this.client = new MongoClient(url);
    this.db = this.client.db(db);
  }

  static async getInstance() {
    if (!this.instance) {
      this.instance = new this();
      await this.instance.connect();
    }
    return this.instance;
  }

  async connect() {
    await this.client.connect();
  }

  async insert<T = any>(name: string, doc: T) {
    const collection = this.db.collection(name);
    await collection.insertOne(doc);
  }

  async getById(name: string, id: string) {
    const collection = this.db.collection(name);
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async list(name: string) {
    const collection = this.db.collection(name);
    const res = await collection.find();
    return await res.toArray();
  }
}
