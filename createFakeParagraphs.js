const fs = require('fs');
const faker = require('faker');
const fakeParagraphs = fs.createWriteStream('fakeParagraphs.json', { flags : 'w' });

fakeParagraphs.on('close', function () {
  console.log('All done!');
});

fakeParagraphs.on('data', function () {
  if (Math.floor(Math.random() * 10 + 1) > 6) {
    fakeParagraphs.write(faker.lorem.paragraph());
  }
    fakeParagraphs.write(faker.lorem.paragraphs());
});

for (let i = 1; i <= 260000000; i += 1) {
  if (i % 500000 === 0) {
    console.log(i, 'records created!', new Date())
  }
  fakeParagraphs.emit('data');
}

fakeParagraphs.end();



// fs.writeFile('fakeParagraphs.json', JSON.stringify(fakeParagraphs), function (err) {
//     if (err) {
//       return console.log(err);
//     } else {
//       console.log('file write success');
//     }
// });

