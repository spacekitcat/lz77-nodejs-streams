const process = require('process');
const CompactorStack = require('./lib/compactor-stack').default;
const Dictionary = require('./lib/dictionary').default;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const dictionary = new Dictionary();
const compactor = new CompactorStack();

readline.question('Enter a search term: ', response => {
  const input = Buffer.from(response);
  compactor.append(input);
  while (compactor.getAvailableBytes() > 0) {
    const result = compactor.popNextToken(dictionary);
    if (result.token) {
      dictionary.append(result.token);
    }
    console.log(result);
  }
});
