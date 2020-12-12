import { flags as flagParser } from '@oclif/command';
import BaseCommand from '../../../base';
export default class VoteCommand extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        passphrase: flagParser.IOptionFlag<string | undefined>;
        'second-passphrase': flagParser.IOptionFlag<string | undefined>;
        'no-signature': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        votes: flagParser.IOptionFlag<string | undefined>;
        unvotes: flagParser.IOptionFlag<string | undefined>;
        json: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        pretty: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
