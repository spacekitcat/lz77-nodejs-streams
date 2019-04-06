#!/usr/bin/env time node --prof
const LibzStream = require('./lib/libz-stream').default;
const fs = require('fs');
const process = require('process');
const _colors = require('colors');
const _cliProgress = require('cli-progress');

let filePath = process.argv[2];
if (!filePath) {
  console.log('No input file path specified. Please provide a file path.');
  process.exit(-1);
}
let fileReadStream = fs.createReadStream(filePath, { highWaterMark: 1024 });
const statsBefore = fs.statSync(filePath);

const megaBytes = bytes => Math.round((bytes / 1024 / 1024) * 100) / 100;

const megaBytesDisplayString = (bytes, unitLabel = 'MB') =>
  `${megaBytes(bytes)} ${unitLabel}`;

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
    _colors.italic(' {bar} ') +
    _colors.bold(' {percentage}% ') +
    _colors.bold(' ' + _colors.blue(' ETA ') + '{eta}s ') +
    _colors.bold(' ' + _colors.blue(' SAVING ') + '{saving} ') +
    _colors.bold(' ' + _colors.blue(' SPEED ') + '{speed} ') +
    _colors.bold(' ' + _colors.blue(' PROGRESS ') + '{value}/{total} MB')
});
progressBar.start(megaBytes(statsBefore.size), 0, { saving: '�', speed: '�' });

let updateSpeedAccumulator = 0;
let updateSpeedLastUpdate = 0;
let currentUpdateSpeed = 0;
const updateSpeed = diff => {
  if (updateSpeedLastUpdate < Date.now() - 1000) {
    currentUpdateSpeed = updateSpeedAccumulator;
    updateSpeedAccumulator = 0;
    updateSpeedLastUpdate = Date.now();
  }
  updateSpeedAccumulator += diff;
};

compressorTransformer.on('data', data => {
  const oldByteCount = byteCount;
  byteCount += 1;
  if (data.prefix) {
    byteCount += data.prefix.length;
    if (data.prefix.length > 3) {
      saving += data.prefix.length - 3;
    }
  }
  updateSpeed(byteCount - oldByteCount);
  progressBar.update(megaBytes(byteCount), {
    saving: megaBytesDisplayString(saving),
    speed: megaBytesDisplayString(currentUpdateSpeed, 'MB/s')
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
