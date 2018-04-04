const COLOR = require('chalk');

exports.warn = (...message) => {
    console.log(COLOR.red('[WARNING]'))
    console.log(...message);
    console.log(COLOR.yellow('[/WARNING]'))
};

exports.console = (...message) => {
    console.log(...message);
};

