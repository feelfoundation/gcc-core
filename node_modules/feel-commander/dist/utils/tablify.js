"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cli_table3_1 = tslib_1.__importDefault(require("cli-table3"));
const chars = {
    top: '═',
    'top-mid': '╤',
    'top-left': '╔',
    'top-right': '╗',
    bottom: '═',
    'bottom-mid': '╧',
    'bottom-left': '╚',
    'bottom-right': '╝',
    left: '║',
    'left-mid': '╟',
    mid: '─',
    'mid-mid': '┼',
    right: '║',
    'right-mid': '╢',
    middle: '│',
};
const getKeyValueObject = (object) => {
    if (!object || typeof object !== 'object') {
        return object;
    }
    return Object.entries(object)
        .map(([key, value]) => `${key}: ${JSON.stringify(value, undefined, ' ')}`)
        .join('\n');
};
const getKeyValueArray = (array) => array.some(item => typeof item === 'object')
    ? array.map(getKeyValueObject).join('\n\n')
    : array.join('\n');
const addValuesToTable = (table, data) => {
    Object.entries(data).forEach(([key, values]) => {
        const strValue = Array.isArray(values)
            ? getKeyValueArray(values)
            : getKeyValueObject(values);
        table.push({ [key]: strValue });
    });
};
exports.tablify = (data) => {
    const table = new cli_table3_1.default({
        chars,
        style: {
            head: [],
            border: [],
        },
    });
    if (Array.isArray(data)) {
        data.forEach((value, key) => {
            const cell = [
                {
                    colSpan: 2,
                    content: `data ${key + 1}`,
                },
            ];
            table.push(cell);
            addValuesToTable(table, value);
        });
    }
    else {
        addValuesToTable(table, data);
    }
    return table;
};
//# sourceMappingURL=tablify.js.map