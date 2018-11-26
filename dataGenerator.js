const faker = require('faker');
const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;
const imagesDir = [];

// const stream = fs.createWriteStream('stream.json');
// stream.on('data', (chunk) => {
//   stream.write(chunk[0]);
// });

var recordsMade = 0;
var startTime = new Date().getTime();

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};

const isCreator = (percentLikely, authorName) => {
  if (getRandomInt(1, 101) < percentLikely) {
    return authorName;
  }
  return faker.name.findName();
};

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

const getRandomProfilePic = () => {
  if (getRandomInt(0, otherPics.length * 2) > otherPics.length) {
    return defaultProfilePic;
  }
  return otherPics[getRandomInt(0, otherPics.length)];
};

const randomBodyLength = () => {
  if (getRandomInt(1, 11) > 6) {
    return faker.lorem.paragraph();
  }
  return faker.lorem.paragraphs();
};

var replies;
var author;
const generateReplies = () => {
  replies = [];
  for (var i = 0; i < getRandomInt(0, 4); i += 1) {
    author = faker.name.findName(),
    replies.push({
      id: i,
      author: faker.name.findName(),
      authorIsCreator: isCreator(50, author),
      profilePicture: getRandomProfilePic(),
      createdAt: faker.date.recent(),
      body: randomBodyLength(),
    });
  }
  return replies;
};

var fakeProject;
var fakeCommentData = [];
var projectsChunk;

const getChunk = (i) => {
  fakeCommentData = [];
  fakeProject = {
    _id: i,
    author: faker.name.findName(),
    comments: fakeCommentData,
  }
  for (let j = 0; j < getRandomInt(1, 13); j += 1) {
    fakeCommentData.push({
      id: j,
      author: isCreator(1, author),
      profilePicture: getRandomProfilePic(),
      createdAt: faker.date.recent(),
      body: randomBodyLength(),
      replies: generateReplies(),
    });
  }

  if (i === 1) {
    return JSON.stringify(fakeProject);
  } else {
    return `,${JSON.stringify(fakeProject)}`;
  }
};


const stream = fs.createWriteStream('bulkProjects.json', {highwaterMark: 32768});
let i = 0;
let bracketWritten = false;

const projectsToMake = 10000000;
stream.write('[');
const write = () => {
  while (i < projectsToMake) {
    i += 1
    projectsChunk = getChunk(i);
    if(!stream.write(projectsChunk)) {
     // console.log('writing', i, '! ... waiting!');
      break;
    } else {
     // console.log('writing', i, '!');
    }
    if (i >= projectsToMake) {
        stream.write(']');
        bracketWritten = true;
        break;
    }
  } if(i === projectsToMake) {
    stream.end(() => {
      console.log('Stream ended!');
      console.log(`Completed ${projectsToMake} Projects/primary rows in ${(new Date().getTime() - startTime) / 1000 / 60} minutes!`);
      console.log('Bracket written ===', bracketWritten);
    });
  }
};

stream.on('drain', write);
stream.on('error', (err) => {
  console.error('!! Error:', err);
});
stream.on('finish', () => console.log('All writes now complete!'));
write();

