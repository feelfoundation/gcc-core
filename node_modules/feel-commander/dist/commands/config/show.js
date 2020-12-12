"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("../../base"));
class ShowCommand extends base_1.default {
    async run() {
        this.print(this.userConfig);
    }
}
ShowCommand.description = `
		Prints the current configuration.
	`;
ShowCommand.examples = ['config:show'];
ShowCommand.flags = Object.assign({}, base_1.default.flags);
exports.default = ShowCommand;
//# sourceMappingURL=show.js.map