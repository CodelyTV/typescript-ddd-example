import { CreateCourseCommand } from './CreateCourseCommand';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CourseCreator } from './CourseCreator';
import { Command } from '../../../Shared/domain/Command';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CourseName } from '../domain/CourseName';
import { CourseDuration } from '../domain/CourseDuration';

export class CreateCourseCommandHandler implements CommandHandler<CreateCourseCommand> {
    constructor(private courseCreator: CourseCreator) {}

    subscribedTo(): Command {
        return CreateCourseCommand;
    }

    async handle(command: CreateCourseCommand): Promise<void> {
        const courseId = new CourseId(command.id);
        const courseName = new CourseName(command.name);
        const courseDuration = new CourseDuration(command.duration);
        await this.courseCreator.run({ courseId, courseName, courseDuration });
    }
}
