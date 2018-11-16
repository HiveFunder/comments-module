const request = require('request');
const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

const fileCount = 0;
const imagesToDownload = 1000;
const imageDir = 'images';

const urlOptions = {
  baseUrl: 'https://loremflickr.com',
  width: '150',
  height: '112',
  topic: 'profilepic',
};

const requestDelay = 3000;
let timeout = 0;

const url =`${urlOptions.baseUrl}/${urlOptions.width}/${urlOptions.height}/${urlOptions.topic}`;

for (let i = 0; i < imagesToDownload; i += 1) {
  let imageName = sprintf('%05s.jpg', i);
  let imagePath = path.join(imageDir, imageName);
  setTimeout(() => {
    let stream = request(url).pipe(fs.createWriteStream(imagePath));
    stream.on('finish', (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Image ${i} created at images/${imageName}`);
      }
    });
  }, timeout);
  timeout += requestDelay;
}
