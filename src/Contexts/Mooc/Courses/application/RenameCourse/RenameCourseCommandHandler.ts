import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { Command } from '../../../../Shared/domain/Command';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { CourseName } from '../../../Shared/domain/Courses/CourseName';
import { CourseRenamer } from './CourseRenamer';
import { RenameCourseCommand } from './RenameCourseCommand';

export class RenameCourseCommandHandler implements CommandHandler<RenameCourseCommand> {
    constructor(private courseRenamer: CourseRenamer) {}

    subscribedTo(): Command {
        return RenameCourseCommand;
    }

    async handle(command: RenameCourseCommand): Promise<void> {
        const courseId = new CourseId(command.id);
        const courseName = new CourseName(command.name);
        await this.courseRenamer.run({ courseId, courseName });
    }
}
