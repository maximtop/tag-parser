const util = require('util')

const log = (obj) => {
    console.log(util.inspect(obj, {showHidden: false, depth: null}));
};

const parseString = (str) => {
    const tagOpeningBraceIdx = str.indexOf('<');

    if (tagOpeningBraceIdx > -1) {
        let tagClosingBraceIdx = str.indexOf('>', tagOpeningBraceIdx);
        let tagName = str.substring(tagOpeningBraceIdx + 1, tagClosingBraceIdx);
        let closingTag = `</${tagName}>`;
        let closingTagIdx = str.lastIndexOf(closingTag);
        let tagContent = str.substring(tagClosingBraceIdx + 1, closingTagIdx);
        const tagNode = {
            type: 'tag',
            value: tagName,
            children: [ ...parseString(tagContent)],
        }
        const contentBeforeTag = str.substring(0, tagOpeningBraceIdx);
        const nodeBeforeTag = parseString(contentBeforeTag);
        const contentAfterTag = str.substring(closingTagIdx + closingTag.length);
        const nodeAfterTag = parseString(contentAfterTag);
        return [...nodeBeforeTag, tagNode, ...nodeAfterTag];
    }

    if (str.length > 0) {
        const textNode = {
            type: 'text',
            value: str,
        }

        return [textNode];
    }

    return [];
}

const parser = (str) => {
    return parseString(str);
}

module.exports.parser = parser;
