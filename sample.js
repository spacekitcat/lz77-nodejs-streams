#!/usr/bin/env time node --prof
const LibzStream = require('./lib/libz-stream').default;
const fs = require('fs');
const process = require('process');
const Spinner = require('cli-spinner').Spinner;

var spinner = new Spinner('%s');
spinner.setSpinnerString('★☆');
spinner.setSpinnerDelay(1000);
spinner.setSpinnerTitle('\x1b[31m  AWAITING DATA \x1b[0m');
spinner.start();

let filePath = process.argv[2];
if (!filePath) {
  console.log('No input file path specified. Please provide a file path.');
  process.exit(-1);
}
let fileReadStream = fs.createReadStream(filePath, { highWaterMark: 1024 });
const statsBefore = fs.statSync(filePath);

const calculateProgress = (current, total) =>
  Math.round((current / total) * 100, 2);

let compressorTransformer = new LibzStream();
let byteCount = 0;
let saving = 0;
compressorTransformer.on('data', data => {
  spinner.stop(true);
  byteCount += 1;
  if (data.prefix) {
    byteCount += data.prefix.length;
    if (data.prefix.length > 3) {
      saving += data.prefix.length - 3;
    }
  }
  spinner.setSpinnerTitle(
    `PROGRESS ${calculateProgress(
      byteCount,
      statsBefore.size
    )}%, SAVINGS ${saving}`
  );
  spinner.start();
});

compressorTransformer.on('end', () => {
  spinner.stop(false);
  console.log();
  console.log(`I compressed the devil outta ${filePath}`);
  //const statsAfter = fs.statSync(`${filePath}.bzz`);
  console.log();
  console.log(`    Input size: ${statsBefore.size}`);
  //console.log(`    Ouput size: ${statsAfter.size}`);
  //console.log(`    IO   ratio: ${statsAfter.size / statsBefore.size}`);
  console.log();
});

fileReadStream.pipe(compressorTransformer);
