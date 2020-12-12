"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
class FileSystemError extends Error {
    constructor(message) {
        super(message);
        this.message = chalk_1.default.red(message);
        this.name = 'FileSystemError';
    }
}
exports.FileSystemError = FileSystemError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.message = chalk_1.default.red(message);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=error.js.map