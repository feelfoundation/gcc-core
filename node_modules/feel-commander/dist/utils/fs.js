"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.readJSONSync = (path) => {
    const contents = fs_1.readFileSync(path, 'utf8');
    const stripped = contents.replace(/^\uFEFF/, '');
    return JSON.parse(stripped);
};
exports.writeJSONSync = (path, contents) => {
    const json = JSON.stringify(contents, undefined, '\t');
    fs_1.writeFileSync(path, json);
};
//# sourceMappingURL=fs.js.map