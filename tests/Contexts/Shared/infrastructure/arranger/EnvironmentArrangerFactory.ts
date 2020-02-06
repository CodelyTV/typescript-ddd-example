import { EnvironmentArranger } from './EnvironmentArranger';
import { MongoClient } from 'mongodb';
import { MongoEnvironmentArranger } from './MongoEnvironmentArranger';
import { NullEnvironmentArranger } from './NullEnvironmentArranger';

export default class EnvironmentArrangerFactory {
  static async createEnvironmentArranger(connectionManager: Promise<any>): Promise<EnvironmentArranger> {
    const manager = await connectionManager;

    if (manager instanceof MongoClient) {
      return new MongoEnvironmentArranger(connectionManager);
    }

    return new NullEnvironmentArranger();
  }
}
