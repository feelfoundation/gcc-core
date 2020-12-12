"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("../../base"));
const api_1 = require("../../utils/api");
const query_1 = require("../../utils/query");
class GetCommand extends base_1.default {
    async run() {
        const { args } = this.parse(GetCommand);
        const { usernames: usernamesStr } = args;
        const usernames = usernamesStr
            .split(',')
            .filter(Boolean);
        const req = usernames.map(username => ({
            query: {
                limit: 1,
                username,
            },
            placeholder: {
                username,
                message: 'Delegate not found.',
            },
        }));
        const client = api_1.getAPIClient(this.userConfig.api);
        const results = await query_1.query(client, 'delegates', req);
        this.print(results);
    }
}
GetCommand.args = [
    {
        name: 'usernames',
        required: true,
        description: 'Comma-separated username(s) to get information about.',
    },
];
GetCommand.description = `
	Gets delegate information from the blockchain.
	`;
GetCommand.examples = [
    'delegate:get lightcurve',
    'delegate:get lightcurve,4miners.net',
];
GetCommand.flags = Object.assign({}, base_1.default.flags);
exports.default = GetCommand;
//# sourceMappingURL=get.js.map