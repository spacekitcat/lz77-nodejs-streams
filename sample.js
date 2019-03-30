const process = require('process');
//const fs = require('fs');

// let filePath = process.argv[2];

// if (!filePath) {
//   console.log('No input file path specified. Please provide a file path.');
//   process.exit(-1);
// }

//let fileReadStream = fs.createReadStream(filePath);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const findNextToken = require('./lib`/binary-search/dictionary-token-finder')
  .default;

const Dictionary = require('./lib/dictionary').default;

const dictionary = new Dictionary();

//dictionary.append(Buffer.from('The quick brown fox jumps over the lazy dog.'));

readline.question('Enter a search term: ', response => {
  const input = Buffer.from(response);
});
