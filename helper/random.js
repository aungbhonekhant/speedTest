/**
 * @description retrun rundom float
 */
module.exports = {
    float: function () {
        const float = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
        return float;
    }, 
}