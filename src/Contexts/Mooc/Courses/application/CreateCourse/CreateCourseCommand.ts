import { Command } from '../../../../Shared/domain/Command';

type Params = {
    id: string;
    name: string;
    duration: string;
    description: string;
};

export class CreateCourseCommand extends Command {
    readonly id: string;
    readonly name: string;
    readonly duration: string;
    readonly description: string;

    constructor({ id, name, duration, description }: Params) {
        super();
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.description = description;
    }
}
