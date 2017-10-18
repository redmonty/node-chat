const expect = require('expect');
const {generateMessage} = require('./message');

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