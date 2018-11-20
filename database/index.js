const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'hiveFundComments';

// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });

mongoose.connect(`mongodb://localhost:27017/hiveFundComments`, {}, (err) => {
  if (err) {
    console.log('OMG! Failed to connect to database! :(');
    console.error(err);
  } else {
    console.log('YAY! connected to database! :D');
  }
});

const projectSchema = new mongoose.Schema({
  projectId: Number,
  author: String,
  comments: Array,
});

const Project = mongoose.model('Project', projectSchema);

module.exports.Project = Project;
