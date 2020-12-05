import { Command } from '../../../../Shared/domain/Command';

type Params = {
    id: string;
    name: string;
};

export class RenameCourseCommand extends Command {
    id: string;
    name: string;

    constructor({ id, name }: Params) {
        super();
        this.id = id;
        this.name = name;
    }
}
