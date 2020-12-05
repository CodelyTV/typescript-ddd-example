import { RenameCourseCommand } from '../../../../../../src/Contexts/Mooc/Courses/application/RenameCourse/RenameCourseCommand';
import { CourseIdMother } from '../../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from '../../domain/CourseNameMother';

export class RenameCourseCommandMother {
    static create(id: string, name: string): RenameCourseCommand {
      return new RenameCourseCommand({ id, name});
    }
  
    static random(): RenameCourseCommand {
      return this.create(CourseIdMother.random().value, CourseNameMother.random().value);
    }
  }
  