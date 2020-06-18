const util = require('util');

const log = (obj) => {
    console.log(util.inspect(obj, {showHidden: false, depth: null}));
};

module.exports.log = log;
