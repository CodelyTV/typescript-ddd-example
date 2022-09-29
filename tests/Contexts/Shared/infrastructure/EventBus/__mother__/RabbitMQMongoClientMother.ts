import { MongoClientFactory } from '../../../../../../src/Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory';

export class RabbitMQMongoClientMother {
  static async create() {
    return MongoClientFactory.createClient('shared', {
      url: 'mongodb://localhost:27017/mooc-backend-test1'
    });
  }
}
