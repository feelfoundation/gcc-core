"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("../../base"));
const api_1 = require("../../utils/api");
const query_1 = require("../../utils/query");
class GetCommand extends base_1.default {
    async run() {
        const { args } = this.parse(GetCommand);
        const { blockIds: blockIdsStr } = args;
        const blockIds = blockIdsStr.split(',').filter(Boolean);
        const req = blockIds.map((blockId) => ({
            query: {
                limit: 1,
                blockId,
            },
            placeholder: {
                id: blockId,
                message: 'Block not found.',
            },
        }));
        const client = api_1.getAPIClient(this.userConfig.api);
        const results = await query_1.query(client, 'blocks', req);
        this.print(results);
    }
}
GetCommand.args = [
    {
        name: 'blockIds',
        required: true,
        description: 'Comma-separated block ID(s) to get information about.',
    },
];
GetCommand.description = `
		Gets block information from the blockchain.
	`;
GetCommand.examples = [
    'block:get 17108498772892203620',
    'block:get 17108498772892203620,8541428004955961162',
];
GetCommand.flags = Object.assign({}, base_1.default.flags);
exports.default = GetCommand;
//# sourceMappingURL=get.js.map