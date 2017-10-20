const moment = require('moment');
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};
var generateLocationMessage = (from, lan, lon) => {
    return {
        from,
        url: `https://www.google.com.ua/maps?q=${lan},${lon}`,
        createdAt: moment().valueOf()
    };
};
module.exports = {generateMessage, generateLocationMessage};