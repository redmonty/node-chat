
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};
var generateLocationMessage = (from, lan, lon) => {
    return {
        from,
        url: `https://www.google.com.ua/maps?q=${lan},${lon}`,
        createdAt: new Date().getTime()
    };
};
module.exports = {generateMessage, generateLocationMessage};