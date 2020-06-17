const util = require('util');

const STATES = {
    TEXT: 'text',
    OPEN_TAG: 'open_tag',
    CLOSE_TAG: 'close_tag',
}

const textNode = (str) => {
    return { type: 'text', value: str };
}

const tagNode = (tagName, children) => {
    if (children && children.length > 0) {
        return { type: 'tag', value: tagName, children};
    }
    return { type: 'tag', value: tagName }
}

const isNode = (checked) => {
    return !!checked?.type;
}

const parser = (str) => {
    const stack = [];
    const result = [];

    let i = 0;
    let currentState = STATES.TEXT;
    let openTag = '';
    let closeTag = '';
    let text = '';

    while (i < str.length) {
        const currChar = str[i];
        switch (currentState) {
            case STATES.TEXT: {
                if (currChar === '<') {
                    currentState = STATES.OPEN_TAG;
                    if (text.length > 0) {
                        const node = textNode(text);
                        if (stack.length > 0) {
                            stack.push(node);
                        } else {
                            result.push(node);
                        }
                        text = '';
                    }
                } else {
                    text += currChar;
                }
                break;
            }
            case STATES.OPEN_TAG: {
                if (currChar === '>') {
                    currentState = STATES.TEXT;
                    stack.push(openTag);
                    openTag = '';
                } else if (currChar === '/') {
                    currentState = STATES.CLOSE_TAG;
                } else {
                    openTag += currChar;
                }
                break;
            }
            case STATES.CLOSE_TAG: {
                if (currChar === '>') {
                    currentState = STATES.TEXT;
                    let children = [];
                    while (true) {
                        const lastFromStack = stack.pop();
                        if (lastFromStack === closeTag) {
                            const node = tagNode(closeTag, children);
                            if (stack.length > 0) {
                                stack.push(node);
                            } else {
                                result.push(node);
                            }
                            children = [];
                            break;
                        } else {
                            if (isNode(lastFromStack)) {
                                children.unshift(lastFromStack);
                            } else {
                                throw new Error('String has unbalanced tags')
                            }
                        }
                        if (stack.length === 0 && children.length > 0) {
                            throw new Error('String has unbalanced tags');
                        }
                    }
                    closeTag = '';
                } else {
                    closeTag += currChar;
                }
                break;
            }
        }

        i += 1;
    }

    if (text.length > 0) {
        result.push(textNode(text))
    }

    if (stack.length > 0) {
        throw new Error('String has unbalanced tags');
    }

    return result;
}

module.exports.parser = parser;
