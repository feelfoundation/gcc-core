"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const readline_1 = tslib_1.__importDefault(require("readline"));
const error_1 = require("../error");
const helpers_1 = require("../helpers");
const capitalise = (text) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
const getPassphraseVerificationFailError = (displayName) => `${capitalise(displayName)} was not successfully repeated.`;
const getPassphraseSourceTypeUnknownError = (displayName) => `${capitalise(displayName)} was provided with an unknown source type. Must be one of \`env\`, \`file\`, or \`stdin\`. Leave blank for prompt.`;
const getPassphraseEnvVariableNotSetError = (displayName) => `Environmental variable for ${displayName} not set.`;
const getFileDoesNotExistError = (path) => `File at ${path} does not exist.`;
const getFileUnreadableError = (path) => `File at ${path} could not be read.`;
const ERROR_DATA_MISSING = 'No data was provided.';
const ERROR_DATA_SOURCE = 'Unknown data source type.';
const DEFAULT_TIMEOUT = 100;
exports.splitSource = (source) => {
    const delimiter = ':';
    const sourceParts = source.split(delimiter);
    return {
        sourceType: sourceParts[0],
        sourceIdentifier: sourceParts.slice(1).join(delimiter),
    };
};
exports.getStdIn = async ({ passphraseIsRequired, secondPassphraseIsRequired, passwordIsRequired, dataIsRequired, } = {}) => {
    const readFromStd = new Promise((resolve, reject) => {
        if (!(passphraseIsRequired ||
            secondPassphraseIsRequired ||
            passwordIsRequired ||
            dataIsRequired)) {
            resolve({});
            return;
        }
        const lines = [];
        const rl = readline_1.default.createInterface({ input: process.stdin });
        const id = setTimeout(() => {
            clearTimeout(id);
            reject(new Error(`Timed out after ${DEFAULT_TIMEOUT} ms`));
        }, DEFAULT_TIMEOUT);
        const handleClose = () => {
            const passphraseIndex = 0;
            const passphrase = passphraseIsRequired
                ? lines[passphraseIndex]
                : undefined;
            const secondPassphraseIndex = passphraseIndex + (passphrase !== undefined ? 1 : 0);
            const secondPassphrase = secondPassphraseIsRequired
                ? lines[secondPassphraseIndex]
                : undefined;
            const passwordIndex = secondPassphraseIndex + (secondPassphrase !== undefined ? 1 : 0);
            const password = passwordIsRequired ? lines[passwordIndex] : undefined;
            const dataStartIndex = passwordIndex + (password !== undefined ? 1 : 0);
            const dataLines = lines.slice(dataStartIndex);
            resolve({
                passphrase,
                secondPassphrase,
                password,
                data: dataLines.length ? dataLines.join('\n') : undefined,
            });
            return;
        };
        return rl.on('line', line => lines.push(line)).on('close', handleClose);
    });
    return readFromStd;
};
exports.getPassphraseFromPrompt = async ({ displayName, shouldRepeat, }) => {
    const questions = [
        {
            type: 'password',
            name: 'passphrase',
            message: `Please enter ${displayName}: `,
        },
    ];
    if (shouldRepeat) {
        questions.push({
            type: 'password',
            name: 'passphraseRepeat',
            message: `Please re-enter ${displayName}: `,
        });
    }
    if (!helpers_1.stdoutIsTTY() || !helpers_1.stdinIsTTY()) {
        throw new Error(`Please enter ${displayName} using a flag when piping data.`);
    }
    const { passphrase, passphraseRepeat } = (await inquirer_1.default.prompt(questions));
    if (!passphrase || (shouldRepeat && passphrase !== passphraseRepeat)) {
        throw new error_1.ValidationError(getPassphraseVerificationFailError(displayName));
    }
    return passphrase;
};
exports.getPassphraseFromEnvVariable = async (key, displayName) => {
    const passphrase = process.env[key];
    if (!passphrase) {
        throw new error_1.ValidationError(getPassphraseEnvVariableNotSetError(displayName));
    }
    return passphrase;
};
exports.getPassphraseFromFile = async (path) => new Promise((resolve, reject) => {
    const stream = fs_1.default.createReadStream(path);
    const handleReadError = (error) => {
        stream.close();
        const { message } = error;
        if (message.match(/ENOENT/)) {
            reject(new error_1.FileSystemError(getFileDoesNotExistError(path)));
            return;
        }
        if (message.match(/EACCES/)) {
            reject(new error_1.FileSystemError(getFileUnreadableError(path)));
            return;
        }
        reject(error);
        return;
    };
    const handleLine = (line) => {
        stream.close();
        resolve(line);
    };
    stream.on('error', handleReadError);
    readline_1.default
        .createInterface({ input: stream })
        .on('error', handleReadError)
        .on('line', handleLine);
});
exports.getPassphraseFromSource = async (source, { displayName }) => {
    const { sourceType, sourceIdentifier } = exports.splitSource(source);
    switch (sourceType) {
        case 'env':
            return exports.getPassphraseFromEnvVariable(sourceIdentifier, displayName);
        case 'file':
            return exports.getPassphraseFromFile(sourceIdentifier);
        case 'pass':
            return sourceIdentifier;
        default:
            throw new error_1.ValidationError(getPassphraseSourceTypeUnknownError(displayName));
    }
};
exports.getPassphrase = async (passphraseSource, options) => {
    const optionsWithDefaults = Object.assign({ displayName: 'your secret passphrase' }, options);
    return passphraseSource && passphraseSource !== 'prompt'
        ? exports.getPassphraseFromSource(passphraseSource, optionsWithDefaults)
        : exports.getPassphraseFromPrompt(optionsWithDefaults);
};
exports.handleReadFileErrors = (path) => (error) => {
    const { message } = error;
    if (message.match(/ENOENT/)) {
        throw new error_1.FileSystemError(getFileDoesNotExistError(path));
    }
    if (message.match(/EACCES/)) {
        throw new error_1.FileSystemError(getFileUnreadableError(path));
    }
    throw error;
};
exports.getDataFromFile = async (path) => fs_1.default.readFileSync(path, 'utf8');
exports.getData = async (source) => {
    if (!source) {
        throw new error_1.ValidationError(ERROR_DATA_MISSING);
    }
    const { sourceType, sourceIdentifier: path } = exports.splitSource(source);
    if (sourceType !== 'file') {
        throw new error_1.ValidationError(ERROR_DATA_SOURCE);
    }
    return exports.getDataFromFile(path).catch(exports.handleReadFileErrors(path));
};
//# sourceMappingURL=utils.js.map