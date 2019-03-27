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

const InputRunLengthSearch = require('./lib/input-run-length-search').default;
const Dictionary = require('./lib/dictionary').default;

const inputRunLengthSearch = new InputRunLengthSearch();
const dictionary = new Dictionary();

//dictionary.append(Buffer.from('The quick brown fox jumps over the lazy dog.'));

readline.question('Enter a search term: ', response => {
  console.log(Buffer.from(response));
  inputRunLengthSearch.append(Buffer.from(response));
  while (inputRunLengthSearch.getLength() > 0) {
    const result = inputRunLengthSearch.findMatchingSubString(dictionary);
    if (result) {
      console.log(result.offset);
      console.log(result.length - 1);
      console.log(result.value.slice(result.length - 1, result.length));
      dictionary.append(result.value);
      for (let i = 0; i < result.value.length; ++i) {
        inputRunLengthSearch.pop();
      }
    } else {
      const g = inputRunLengthSearch.pop();
      console.log(g);
      dictionary.append(g);
    }
  }
});
