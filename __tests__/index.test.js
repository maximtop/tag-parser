const { parser } = require('../parser');

describe('parser', () => {
    it('parses', () => {
        const str = 'String to translate';
        const expectedAst = [{type: 'text', value: str}];
        expect(parser(str)).toEqual(expectedAst);
    });

    it('parses', () => {
        const str = 'String to <a>translate</a>';
        const expectedAst = [
            {
                type: 'text',
                value: 'String to '
            },
            {
                type: 'tag',
                value: 'a',
                children: [{ type: 'text', value: 'translate' }]
            }];
        expect(parser(str)).toEqual(expectedAst);
    });
});
