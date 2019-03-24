const process = require('process');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const InputRunLengthSearch = require('./lib/input-run-length-search').default;
const Dictionary = require('./lib/dictionary').default;

const inputRunLengthSearch = new InputRunLengthSearch();
const dictionary = new Dictionary();

dictionary.append(Buffer.from('The quick brown fox jumps over the lazy dog.'));

readline.question('Enter a search term: ', response => {
  inputRunLengthSearch.append(Buffer.from(response));
  const result = inputRunLengthSearch.findMatchingSubString(dictionary);
  console.log(result);
});
