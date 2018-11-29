const request = require('request');
const faker = require('faker');
const rpm = 17000 // rough maximum as of 11/27/2018 : 18000 rpm in dev
// 17000 in
const minutesOfTesting = 1;
const requestsToComplete = rpm * minutesOfTesting;
const requestDelay = minutesOfTesting * 60 * 1000 / requestsToComplete;
var timeout = 0;
const start = new Date().getTime()
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

let outstanding = 0;
for (let i = 0; i < requestsToComplete; i += 1) {
  setTimeout(() => {
    // outstanding++; // for viewing latency in real time
    let options = {
      url: `http://ec2-13-57-249-169.us-west-1.compute.amazonaws.com/${getRandomInt(1, 10000000)}/comments`,
      method: 'GET',
    }
    request(options, function(err, res, body) {
      // console.log(err ? err : `${i + 1} requests complete! \t ${outstanding} outstanding requests \n\n`); // for viewing latency in real time
    });
  }, timeout);
  timeout += requestDelay;
}
