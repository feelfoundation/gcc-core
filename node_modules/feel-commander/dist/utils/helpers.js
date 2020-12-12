"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const regExpAmount = /^\d+(\.\d{1,8})?$/;
const isStringInteger = (n) => {
    const parsed = parseInt(n, 10);
    return !Number.isNaN(parsed) && parsed.toString() === n;
};
exports.validateLifetime = (lifetime) => {
    if (!isStringInteger(lifetime)) {
        throw new error_1.ValidationError('Lifetime must be an integer.');
    }
    return true;
};
exports.validateMinimum = (minimum) => {
    if (!isStringInteger(minimum)) {
        throw new error_1.ValidationError('Minimum number of signatures must be an integer.');
    }
    return true;
};
exports.validateAmount = (amount) => {
    if (!amount.match(regExpAmount)) {
        throw new error_1.ValidationError('Amount must be a number with no more than 8 decimal places.');
    }
    return true;
};
exports.createErrorHandler = (prefix) => ({ message, }) => ({
    error: `${prefix}: ${message}`,
});
exports.handleEPIPE = (err) => {
    if (err.errno !== 'EPIPE') {
        throw err;
    }
};
exports.stdoutIsTTY = () => process.stdout.isTTY;
exports.stdinIsTTY = () => process.stdin.isTTY;
//# sourceMappingURL=helpers.js.map