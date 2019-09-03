const lineReader = require('line-reader');
const fs = require('fs');

const OUTPUT_FILE = './output.csv';
const SHORT_INPUT_FILE = './targetIpList.csv';
const LONG_INPUT_FILE = './ipList.csv';

const stream = fs.createWriteStream(OUTPUT_FILE);
const inputArr = [];

function search() {
  console.log('search');
  const inputArrLen = inputArr.length;
  console.log(inputArrLen);

  lineReader.eachLine(LONG_INPUT_FILE, function(line) {
    for(let i = 0; i < inputArrLen; i++) {

      if (inputArr[i] === line) {
        stream.write(`${line},OK\n`);
        console.log('found');
        return;
      }
    }
    stream.write(`${line}\n`);
  });
}

function read() {
  lineReader.eachLine(SHORT_INPUT_FILE, function(line, last) {
    inputArr.push(line);
    console.log(line);
    if (last) {
      search();
    }
  });
}

stream.once('open', read);
