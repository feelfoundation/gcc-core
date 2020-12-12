"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const base_1 = tslib_1.__importDefault(require("../../base"));
const api_1 = require("../../utils/api");
const constants_1 = require("../../utils/constants");
const query_1 = require("../../utils/query");
const MAXIMUM_LIMIT = 100;
const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;
const DEFAULT_SORT = 'balance:desc';
const processFlagInputs = (limitStr, offsetStr, sortStr) => {
    const limit = parseInt(limitStr, 10);
    const offset = parseInt(offsetStr, 10);
    const sort = sortStr ? sortStr.trim() : undefined;
    if (limitStr !== limit.toString() || !Number.isInteger(limit) || limit <= 0) {
        throw new Error('Limit must be an integer and greater than 0');
    }
    if (limit && limit > MAXIMUM_LIMIT) {
        throw new Error(`Maximum limit amount is ${MAXIMUM_LIMIT}`);
    }
    if (offsetStr !== offset.toString() ||
        !Number.isInteger(offset) ||
        offset < 0) {
        throw new Error('Offset must be an integer and greater than or equal to 0');
    }
    if (sort !== undefined && !constants_1.SORT_FIELDS.includes(sort)) {
        throw new Error(`Sort must be one of: ${constants_1.SORT_FIELDS.join(', ')}`);
    }
    return {
        limit,
        offset,
        sort,
    };
};
class VotersCommand extends base_1.default {
    async run() {
        const { args, flags: { limit: limitStr, offset: offsetStr, sort: sortStr }, } = this.parse(VotersCommand);
        const { usernames: usernamesStr } = args;
        const usernames = usernamesStr.split(',').filter(Boolean);
        const { limit, offset, sort } = processFlagInputs(limitStr, offsetStr, sortStr);
        const req = usernames.map(username => ({
            query: {
                username,
                limit: limit || DEFAULT_LIMIT,
                offset: offset || DEFAULT_OFFSET,
                sort: sort || DEFAULT_SORT,
            },
            placeholder: {
                username,
                message: 'Delegate not found.',
            },
        }));
        const client = api_1.getAPIClient(this.userConfig.api);
        const results = await query_1.query(client, 'voters', req);
        this.print(results);
    }
}
VotersCommand.args = [
    {
        name: 'usernames',
        required: true,
        description: 'Comma-separated username(s) to get information about.',
    },
];
VotersCommand.description = `
	Gets voters information for given delegate(s) from the blockchain.
	`;
VotersCommand.examples = [
    'delegate:voters lightcurve',
    'delegate:voters lightcurve,4miners.net',
    'delegate:voters lightcurve,4miners.net --limit 20 --offset 5 --sort publicKey:asc --pretty',
];
VotersCommand.flags = Object.assign({}, base_1.default.flags, { limit: command_1.flags.string({
        description: 'Limit applied to results.',
        default: '10',
    }), offset: command_1.flags.string({
        description: 'Offset applied to results.',
        default: '0',
    }), sort: command_1.flags.string({
        description: 'Fields to sort results by.',
        default: DEFAULT_SORT,
    }) });
exports.default = VotersCommand;
//# sourceMappingURL=voters.js.map