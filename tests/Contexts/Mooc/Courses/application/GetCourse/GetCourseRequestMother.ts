import { GetCourseRequest } from "../../../../../../src/Contexts/Mooc/Courses/application/GetCourse/GetCourseRequest";
import { UuidMother } from '../../../../Shared/domain/UuidMother';

export class GetCourseRequestMother {
    static random(): GetCourseRequest {
      const id = UuidMother.random()
      return { id };
    }

    static create(id: string): GetCourseRequest {
        return { id };
    }
  }
  