"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isArray = (val) => Array.isArray(val);
exports.handleResponse = (endpoint, res, placeholder) => {
    if (!res.data) {
        throw new Error('No data was returned.');
    }
    if (isArray(res.data)) {
        if (res.data.length === 0) {
            if (placeholder) {
                return placeholder;
            }
            throw new Error(`No ${endpoint} found using specified parameters.`);
        }
        if (res.data.length > 1) {
            return res.data;
        }
        return res.data[0];
    }
    return res.data;
};
exports.query = async (client, endpoint, parameters) => isArray(parameters)
    ? Promise.all(parameters.map(async (param) => client[endpoint]
        .get(param.query)
        .then((res) => exports.handleResponse(endpoint, res, param.placeholder))))
    : client[endpoint]
        .get(parameters.query)
        .then((res) => exports.handleResponse(endpoint, res, parameters.placeholder));
exports.queryNodeTransaction = async (client, txnState, parameters) => Promise.all(parameters.map(async (param) => client
    .getTransactions(txnState, param.query)
    .then(res => exports.handleResponse('node/transactions', res, param.placeholder))));
//# sourceMappingURL=query.js.map