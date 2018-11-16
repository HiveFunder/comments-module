const faker = require('faker');
const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;
const imagesDir = [];

const fakeBulkProjects = fs.createWriteStream('fakeBulkProjects.json', { flags : 'w' });
fakeBulkProjects.on('data', (chunk) => {
  fakeBulkProjects.write(chunk);
});

fakeBulkProjects.write('[');

let recordsMade = 0;
let startTime = new Date();
let endTime;

function getRandomInt(min, max) {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}

function isCreator(percentLikely) {
  if (getRandomInt(1, 101) < percentLikely) {
    return true;
  }
  return false;
}

const otherPics = [];
const imageDir = 'images';
let imageName;
let imagePath;

for (let i = 0; i < 1000; i += 1) {
  imageName = sprintf('%05s.jpg', i);
  imagePath = path.join(imageDir, imageName);
  otherPics.push(imagePath);
}

function getRandomProfilePic() {
  const defaultProfilePic = '';
  const intRange = otherPics.length * 2;
  const randomInt = getRandomInt(0, intRange);
  if (randomInt > otherPics.length) {
    return defaultProfilePic;
  }
  return otherPics[randomInt];
}

function randomBodyLength() {
  if (getRandomInt(1, 11) > 6) {
    return faker.lorem.paragraph();
  }
  return faker.lorem.paragraphs();
}

function generateReplies() {
  const replies = [];
  for (let i = 0; i < getRandomInt(0, 4); i += 1) {
    replies.push({
      author: faker.name.findName(),
      authorIsCreator: isCreator(50),
      profilePicture: getRandomProfilePic(),
      createdAt: faker.date.recent(),
      body: randomBodyLength(),
    });
  }
  return replies;
}

// let projects = [];
let projectsChunk = '';
const projectsToMake = 10000000;
const batchSize = 125000;
for (let i = 1; i <= projectsToMake; i += 1) {
  const fakeCommentData = [];
  for (let j = 0; j < getRandomInt(1, 26); j += 1) {
    fakeCommentData.push({
      id: j,
      author: faker.name.findName(),
      authorIsCreator: isCreator(1),
      profilePicture: getRandomProfilePic(),
      createdAt: faker.date.recent(),
      body: randomBodyLength(),
      replies: generateReplies(),
    });
  }
  // projects.push({
  //   projectId: i,
  //   comments: fakeCommentData,
  // });
  const fakeProject = {
    projectId: i,
    comments: fakeCommentData,
  }
  if (i === 1) {
    projectsChunk += JSON.stringify(fakeProject);
  } else {
    projectsChunk += `,${JSON.stringify(fakeProject)}`;
  }

  if (i % batchSize === 0) {
    endTime = new Date()
    console.log(i, 'records made. Last batch was at a ', Math.abs((startTime.getTime() - endTime.getTime()) / 1000 / 60 / 60 * 10000000 / batchSize), 'hour pace');
    fakeBulkProjects.emit('data', projectsChunk);
    projectsChunk = '';
    startTime = endTime;
  }
}

fakeBulkProjects.write(']');
fakeBulkProjects.end();
// var i = fs.openSync(JSON.stringify(projects), 'r');
// var o = fs.openSync('commentData.json', 'w');

// var buf = new Buffer(1024 * 1024), len, prev = '';

// while(len = fs.readSync(i, buf, 0, buf.length)) {

//     var a = (prev + buf.toString('ascii', 0, len)).split('\n');
//     prev = len === buf.length ? '\n' + a.splice(a.length - 1)[0] : '';

//     var out = '';
//     a.forEach(function(line) {

//         if(!line)
//             return;

//         // do something with your line here

//         out += line + '\n';
//     });

//     var bout = new Buffer(out, 'ascii');
//     fs.writeSync(o, bout, 0, bout.length);
// }

// fs.closeSync(o);
// fs.closeSync(i);

// var writeStream = fs.createWriteStream('commentsData.json');
// var readStream = fs.createReadStream(JSON.stringify(projects));

// readStream.pipe(writeStream);
// writeStream.on('close', function () {
//     console.log('File Write Success!');
// });

// fs.writeFile('commentData.json', JSON.stringify(projects), function (err) {
//     if (err)
//         return console.log(err);
//     console.log('file write success');
// });
