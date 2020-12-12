import { flags as flagParser } from '@oclif/command';
import BaseCommand from '../../../base';
export default class TransferCommand extends BaseCommand {
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    static description: string;
    static examples: string[];
    static flags: {
        passphrase: flagParser.IOptionFlag<string | undefined>;
        'second-passphrase': flagParser.IOptionFlag<string | undefined>;
        'no-signature': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        data: flagParser.IOptionFlag<string | undefined>;
        json: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        pretty: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
