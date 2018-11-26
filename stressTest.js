const request = require('request');
const faker = require('faker');
const rpm = 1000
const minutesOfTesting = 10;
const requestsToComplete = rpm * minutesOfTesting;
const requestDelay = minutesOfTesting * 60 * 1000 / requestsToComplete;
var timeout = 0;

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}
for (let i = 0; i < requestsToComplete; i += 1) {
  setTimeout(() => {
    let options = {
      url: `http://localhost:3001/foobar/${getRandomInt(1, 10000000)}/comments`,
      method: 'GET',
    }
    request(options, function(err, res, body) {
      console.log(err ? err : `${i + 1} requests complete! \n\n`);
    });
  }, timeout);
  timeout += requestDelay;
}

