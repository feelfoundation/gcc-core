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
const VOTES_SORT_FIELDS = constants_1.SORT_FIELDS.filter(field => !field.includes('publicKey'));
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
    if (sort && !VOTES_SORT_FIELDS.includes(sort)) {
        throw new Error(`Sort must be one of: ${VOTES_SORT_FIELDS.join(', ')}`);
    }
    return {
        limit,
        offset,
        sort,
    };
};
class VotesCommand extends base_1.default {
    async run() {
        const { args, flags: { limit: limitStr, offset: offsetStr, sort: sortStr }, } = this.parse(VotesCommand);
        const { addresses: addressesStr } = args;
        const addresses = addressesStr.split(',').filter(Boolean);
        const { limit, offset, sort } = processFlagInputs(limitStr, offsetStr, sortStr);
        const req = addresses.map(address => ({
            query: {
                address,
                limit: limit || DEFAULT_LIMIT,
                offset: offset || DEFAULT_OFFSET,
                sort: sort || DEFAULT_SORT,
            },
            placeholder: {
                address,
                message: 'Account not found.',
            },
        }));
        const client = api_1.getAPIClient(this.userConfig.api);
        const results = await query_1.query(client, 'votes', req);
        this.print(results);
    }
}
VotesCommand.args = [
    {
        name: 'addresses',
        required: true,
        description: 'Comma-separated address(es) to get information about.',
    },
];
VotesCommand.description = `
	Gets votes information for given account(s) from the blockchain.
	`;
VotesCommand.examples = [
    'delegate:votes 13133549779353512613L',
    'delegate:votes 13133549779353512613L,16010222169256538112L',
    'delegate:votes 13133549779353512613L,16010222169256538112L --limit 20 --offset 5 --sort balance:asc --pretty',
];
VotesCommand.flags = Object.assign({}, base_1.default.flags, { limit: command_1.flags.string({
        description: 'Limit applied to results.',
        default: '10',
    }), offset: command_1.flags.string({
        description: 'Offset applied to results.',
        default: '0',
    }), sort: command_1.flags.string({
        description: 'Fields to sort results by.',
        default: DEFAULT_SORT,
    }) });
exports.default = VotesCommand;
//# sourceMappingURL=votes.js.map