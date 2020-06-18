const util = require('util');

const log = (obj) => {
    console.log(util.inspect(obj, {showHidden: false, depth: null}));
};

const isFunction = (target) => {
    return typeof target === 'function';
}

module.exports = {
    log,
    isFunction,
}
