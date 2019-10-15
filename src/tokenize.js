const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (input) => {
  let cursor = 0;
  const tokens = [];

  while (cursor < input.length) {
    const character = input[cursor];

    if (isParenthesis(character)) {
      tokens.push({
        type: 'Parenthesis',
        value: character,
      });
      cursor++;
      continue;
    }

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      let number = character;

      while(isNumber(input[++cursor])) {
        number += input[cursor];
      }

      tokens.push({
        type: 'Number',
        value: Number(number),
      });
      continue;
    }

    if (isLetter(character)) {
      let letter = character;

      while(isLetter(input[++cursor])) {
        letter += input[cursor];
      }

      tokens.push({
        type: 'Name',
        value: letter,
      });
      continue;
    }

    if (isQuote(character)) {
      let string = '';

      while(!isQuote(input[++cursor])) {
        string += input[cursor];
      }

      tokens.push({
        type: 'String',
        value: string,
      });

      cursor++;
      continue;
    }

    throw new Error(`${character} is not valid.`);
  }

  return tokens;
};

module.exports = { tokenize };
