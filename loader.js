// const appConfig = require('./config/config');
// console.log('-----', appConfig);

module.exports = function (result, sourceMaps, meta) {
    // console.log('[--]', {
    //     result: result,
    //     sourceMaps,
    //     meta
    // });
    const changed = result == result.toString().replace('Extra Module', 'CHANGED MODULE');
    const newOutput = {
        result, sourceMaps, meta
    };
    console.log('-----', newOutput);

    this.callback(
        null, newOutput, sourceMaps, meta
    );
    // var callback = this.async();
    // this.callback(null, result, sourceMaps, meta);

};