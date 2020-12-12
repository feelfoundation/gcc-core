"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQueryString = (obj) => {
    const parts = Object.keys(obj).reduce((accumulator, key) => [
        ...accumulator,
        `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`,
    ], []);
    return parts.join('&');
};
const urlParamRegex = /{[^}]+}/;
exports.solveURLParams = (url, params = {}) => {
    if (Object.keys(params).length === 0) {
        if (url.match(urlParamRegex) !== null) {
            throw new Error('URL is not completely solved');
        }
        return url;
    }
    const solvedURL = Object.keys(params).reduce((accumulator, key) => accumulator.replace(`{${key}}`, params[key]), url);
    if (solvedURL.match(urlParamRegex) !== null) {
        throw new Error('URL is not completely solved');
    }
    return encodeURI(solvedURL);
};
//# sourceMappingURL=utils.js.map