"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("../../base"));
const api_1 = require("../../utils/api");
const query_1 = require("../../utils/query");
class GetCommand extends base_1.default {
    async run() {
        const { args } = this.parse(GetCommand);
        const { addresses: addressesStr } = args;
        const addresses = addressesStr.split(',').filter(Boolean);
        const req = addresses.map((address) => ({
            query: {
                limit: 1,
                address,
            },
            placeholder: {
                address,
                message: 'Address not found.',
            },
        }));
        const client = api_1.getAPIClient(this.userConfig.api);
        const results = await query_1.query(client, 'accounts', req);
        this.print(results);
    }
}
GetCommand.args = [
    {
        name: 'addresses',
        required: true,
        description: 'Comma-separated address(es) to get information about.',
    },
];
GetCommand.description = `
		Gets account information from the blockchain.
	`;
GetCommand.examples = [
    'account:get 3520445367460290306L',
    'account:get 3520445367460290306L,2802325248134221536L',
];
GetCommand.flags = Object.assign({}, base_1.default.flags);
exports.default = GetCommand;
//# sourceMappingURL=get.js.map