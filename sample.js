#!/usr/bin/env time node --prof
const LibzStream = require('./lib/libz-stream').default;
const fs = require('fs');
const process = require('process');
const _cliProgress = require('cli-progress');

let filePath = process.argv[2];
if (!filePath) {
  console.log('No input file path specified. Please provide a file path.');
  process.exit(-1);
}
let fileReadStream = fs.createReadStream(filePath, { highWaterMark: 1024 });
const statsBefore = fs.statSync(filePath);

let compressorTransformer = new LibzStream();
let byteCount = 0;
let saving = 0;
const progressBar = new _cliProgress.Bar({
  barCompleteChar: '▓',
  barIncompleteChar: '░',
  fps: 1,
  stream: process.stdout,
  barsize: 32,
  position: 'right',
  etaBuffer: 100,
  format:
    '[{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Saved: {saving} MB (theoretical)'
});
progressBar.start(statsBefore.size, 0, { saving: 0 });

compressorTransformer.on('data', data => {
  byteCount += 1;
  if (data.prefix) {
    byteCount += data.prefix.length;
    if (data.prefix.length > 3) {
      saving += data.prefix.length - 3;
    }
  }
  progressBar.update(byteCount, {
    saving: Math.round((saving / 1024 / 1024) * 100) / 100
  });
});

compressorTransformer.on('end', () => {
  progressBar.stop();
  console.log();
  console.log(`I compressed the devil outta ${filePath}`);
  console.log();
  console.log(`             Input size: ${statsBefore.size}`);
  console.log(`     Theoretical output: ${statsBefore.size - saving}`);
  console.log();
});

fileReadStream.pipe(compressorTransformer);
