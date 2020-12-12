"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const base_1 = tslib_1.__importDefault(require("../../base"));
const flags_1 = require("../../utils/flags");
const delegate_1 = tslib_1.__importDefault(require("./create/delegate"));
const multisignature_1 = tslib_1.__importDefault(require("./create/multisignature"));
const second_passphrase_1 = tslib_1.__importDefault(require("./create/second-passphrase"));
const transfer_1 = tslib_1.__importDefault(require("./create/transfer"));
const vote_1 = tslib_1.__importDefault(require("./create/vote"));
const MAX_ARG_NUM = 3;
const typeNumberMap = {
    '0': 'transfer',
    '1': 'second-passphrase',
    '2': 'delegate',
    '3': 'vote',
    '4': 'multisignature',
};
const options = Object.entries(typeNumberMap).reduce((accumulated, [key, value]) => [
    ...accumulated,
    key,
    value,
], []);
const typeClassMap = {
    transfer: transfer_1.default,
    'second-passphrase': second_passphrase_1.default,
    vote: vote_1.default,
    delegate: delegate_1.default,
    multisignature: multisignature_1.default,
};
const resolveFlags = (accumulated, [key, value]) => {
    if (key === 'type') {
        return accumulated;
    }
    if (typeof value === 'string') {
        return [...accumulated, `--${key}`, value];
    }
    const boolKey = value === false ? `--no-${key}` : `--${key}`;
    return [...accumulated, boolKey];
};
class CreateCommand extends base_1.default {
    async run() {
        const { argv, flags } = this.parse(CreateCommand);
        const { type } = flags;
        const commandType = Object.keys(typeNumberMap).includes(type)
            ? typeNumberMap[type]
            : type;
        const resolvedFlags = Object.entries(flags).reduce(resolveFlags, []);
        await typeClassMap[commandType].run([...argv, ...resolvedFlags]);
    }
}
CreateCommand.args = new Array(MAX_ARG_NUM).fill(0).map(i => ({
    name: `${i}_arg`,
}));
CreateCommand.description = `
	Creates a transaction object.
	`;
CreateCommand.examples = [
    'transaction:create --type=0 100 13356260975429434553L',
    'transaction:create --type=delegate lightcurve',
];
CreateCommand.flags = Object.assign({}, base_1.default.flags, { type: command_1.flags.string({
        char: 't',
        description: 'type of transaction to create',
        required: true,
        options,
    }), passphrase: command_1.flags.string(flags_1.flags.passphrase), 'second-passphrase': command_1.flags.string(flags_1.flags.secondPassphrase), 'no-signature': command_1.flags.boolean(flags_1.flags.noSignature), votes: command_1.flags.string(flags_1.flags.votes), unvotes: command_1.flags.string(flags_1.flags.unvotes) });
exports.default = CreateCommand;
//# sourceMappingURL=create.js.map