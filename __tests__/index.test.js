const { parser } = require('../parser');

describe('parser', () => {
    it('parses', () => {
        const str = 'String to translate';
        const expectedAst = [{type: 'text', value: str}];
        expect(parser(str)).toEqual(expectedAst);
    });

    it('parses tags', () => {
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

    it('parses included tags', () => {
        const str = 'String with a link <a>link <b>with bold</b> content</a> and some text after';
        const expectedAst = [
            { type: 'text', value: 'String with a link ' },
            {
                type: 'tag',
                value: 'a',
                children: [
                    { type: 'text', value: 'link ' },
                    {
                        type: 'tag',
                        value: 'b',
                        children: [ { type: 'text', value: 'with bold' } ]
                    },
                    { type: 'text', value: ' content' }
                ]
            },
            { type: 'text', value: ' and some text after' }
        ];

        expect(parser(str)).toEqual(expectedAst);
    })
});
