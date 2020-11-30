import { GetCourseRequest } from './GetCourseRequest';
import { Query } from '../../../../Shared/domain/Query';

export class GetCourseQuery extends Query {
    id: string;

    constructor({ id }: GetCourseRequest) {
        super();
        this.id = id;
    }
}
