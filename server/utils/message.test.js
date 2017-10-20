const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Redmonty',
            text = 'Hello, have fun and nice day';
        var res = generateMessage(from, text);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({
            from,
            text
        });
        expect(res).toBeA('object');
    });
});
describe('generateLocationMessage', () => {
    it('should generate the correct location object', () => {
        var lan = 1,
            lon = 2;
        var locationObject = generateLocationMessage('Admin', lan, lon);
        expect(locationObject.createdAt).toBeA('number');
        expect(locationObject).toInclude({from: 'Admin'});
        expect(locationObject.url).toBe(`https://www.google.com.ua/maps?q=${lan},${lon}`);
        expect(locationObject).toBeA('object');
    });
});