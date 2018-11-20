const faker = require('faker');
const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;
const imagesDir = [];

const fakeBulkProjects = fs.createWriteStream('fakeBulkProjects.json');
fakeBulkProjects.on('data', (chunk) => {
  console.log(`${chunk[1]} records made. Approximately ${(Math.abs((startTime - new Date().getTime()) / 1000 / 60 * (projectsToMake - chunk[1]) / batchSize))} minutes remain`);
  fakeBulkProjects.write(chunk[0]);
});

fakeBulkProjects.write('[');

var recordsMade = 0;
var startTime = new Date().getTime();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

function isCreator(percentLikely) {
  if (getRandomInt(1, 101) < percentLikely) {
    return fakeProject.author;
  }
  return faker.name.findName();
}

const otherPics = [];
var imageName;
var imagePath;

for (let i = 0; i < 1000; i += 1) {
  imageName = sprintf('%05s.jpg', i);
  otherPics.push(imageName);
}

var intRange;
var intRange;
const defaultProfilePic = '00000.jpg';

function getRandomProfilePic() {
  if (getRandomInt(0, otherPics.length * 2) > otherPics.length) {
    return defaultProfilePic;
  }
  return otherPics[getRandomInt(0, otherPics.length)];
}

function randomBodyLength() {
  if (getRandomInt(1, 11) > 6) {
    return faker.lorem.paragraph();
  }
  return faker.lorem.paragraphs();
}

var replies;
function generateReplies() {
  replies = [];
  for (var i = 0; i < getRandomInt(0, 4); i += 1) {
    replies.push({
      _id: i,
      author: faker.name.findName(),
      authorIsCreator: isCreator(50),
      profilePicture: getRandomProfilePic(),
      createdAt: faker.date.recent(),
      body: randomBodyLength(),
    });
  }
  return replies;
}

const projectsToMake = 10000000;
const batchSize = 125000;
var projectsChunk = '';
var fakeCommentData = [];
var fakeProject;
for (let i = 1; i <= projectsToMake; i += 1) {
  fakeCommentData = [];
  fakeProject = {
    _id: i,
    author: faker.name.findName(),
    comments: fakeCommentData,
  }
  for (let j = 0; j < getRandomInt(1, 26); j += 1) {
    fakeCommentData.push({
      _id: j,
      author: isCreator(1),
      profilePicture: getRandomProfilePic(),
      createdAt: faker.date.recent(),
      body: randomBodyLength(),
      replies: generateReplies(),
    });
  }

  if (i === 1) {
    projectsChunk += JSON.stringify(fakeProject);
  } else {
    projectsChunk += `,${JSON.stringify(fakeProject)}`;
  }

  if (i % batchSize === 0) {
    fakeBulkProjects.emit('data', [projectsChunk, i]);
    projectsChunk = '';
    startTime = new Date().getTime();
  }
}

fakeBulkProjects.write(projectsChunk);
fakeBulkProjects.write(']');
fakeBulkProjects.end();
