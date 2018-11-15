const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

const faker = require('faker');
const filesystem = require('fs');
const fs = filesystem.promises;
var Jimp = require('jimp');

Promise.promisifyAll(request);

let fileCount = 0;
const fileName = `thumbnail_${fileCount}.jpg`
const imagesToDownload = 2;

downloadImages = () => {
  if (imagesToDownload > fileCount) {
    console.log('setting timeout......');
    setTimeout(() => {
      request.get(faker.image.avatar())
        .then((results) => {
            console.log('writing big picture');
            results.pipe()
            fs.writeFile('bigPicture.jpg', results.body)
              .then((results) => {
                console.log('reading......')
                Jimp.read('bigPicture.jpg', (err, bigPicture) => {
                  if (err) {
                    throw err;
                  } else {
                    console.log('resizing....');
                    bigPicture
                      .resize(150, 112) // resize
                      .quality(60) // set JPEG quality
                      .write(fileName); // save
                  }
                  downloadImages();
                });
                fileCount += 1;
              })
              .catch((err) => console.error('Resize failed! err:', err));
          })
        .catch((error) => {
          console.error('Request error:', error); // Print the error if one occurred
          return;
        });
    }, 5000)
  }
};

downloadImages();
