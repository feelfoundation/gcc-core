import { flags as flagParser } from '@oclif/command';
import BaseCommand from '../../base';
export default class GetCommand extends BaseCommand {
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    static description: string;
    static examples: string[];
    static flags: {
        state: flagParser.IOptionFlag<string | undefined>;
        'sender-id': flagParser.IOptionFlag<string | undefined>;
        limit: flagParser.IOptionFlag<string | undefined>;
        offset: flagParser.IOptionFlag<string | undefined>;
        sort: flagParser.IOptionFlag<string | undefined>;
        json: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        pretty: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
