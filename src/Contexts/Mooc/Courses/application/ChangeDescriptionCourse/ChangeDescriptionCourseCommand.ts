import { Command } from '../../../../Shared/domain/Command';

export class ChangeDescriptionCourseCommand extends Command {
    readonly id: string;
    readonly description: string;

    constructor(id: string, description: string) {
        super();
        this.id = id;
        this.description = description;
    }
}