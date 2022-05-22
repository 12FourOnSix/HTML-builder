const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const { pipeline } = require('stream');

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath);

pipeline(
  readStream,
  stdout,
  err => {
    if (err) {
      console.error('Error: ', err.message);
    }
  }
);