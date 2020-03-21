import { MongoDocument } from '../../../../../Shared/infrastructure/persistence/mongo/MongoDocument';

export type CourseDocument = MongoDocument & {
  name: string;
  duration: string;
};
