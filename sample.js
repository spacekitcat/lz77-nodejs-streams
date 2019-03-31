const process = require('process');
const CompactorStack = require('./lib/compactor-stack').default;
const Dictionary = require('./lib/dictionary').default;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const dictionary = new Dictionary();
const compactor = new CompactorStack();

//dictionary.append(Buffer.from('The quick brown fox jumps over the lazy dog.'));

readline.question('Enter a search term: ', response => {
  const input = Buffer.from(response);
  compactor.append(input);
  console.log(compactor.popNextToken(dictionary));
});
