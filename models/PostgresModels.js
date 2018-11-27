//DB connection------------------------------------

const { Client } = require('pg')
const config = require('../config.js');

console.log(config);

const client = new Client({
  connectionString: config.CONNECTION_STRING
})
client.connect()
.then(results => console.log('connection success!'))
.catch(error => console.error('connection error!', error));

// Postgres Model Methods---------------------------
const getCommentsByProjectId = (projectId, callback) => {
  // Send a SELECT columns FROM table WHERE constraints query, passing in the appropriate project._id value, and pass the results into the callback.
  client.query('SELECT * FROM projects WHERE _id = $1', [projectId], callback);
};

const createComment = (projectId, commentId, newComment, callback) => {
  // Send a UPDATE columns -> fields FROM table WHERE constraints query.
    //  Push the appropriate project._id value to the end of the array field for comments.
    //  pass the results into the callback.
  const queryArgs = [
    newComment.id,
    newComment.body,
    newComment.author,
    newComment.replies,
    newComment.createdAt,
    newComment.profilePicture
  ];
  client.query('UPDATE projects SET (id, body, author, replies, createdAt, profilePicture) VALUES($1, $2, $3, $4, $5)', queryArgs, callback);
};

// TODO:-----------------------------------------
// const createReply = (req, res) => {

/*
  I: projectId:str , commentId:str , newComment:obj, callback:fn
  O: None
  C: Under 50ms transaction times
  E: Invalid inputs, malicious imnputs

  Strategy: Send a query through node-pg with escaped query arguments.

*/

// PSEUDOCODE:

// Send an UPDATE table SET column -> field VALUES
  // Check Postgres docs to make sure you understand the syntax for this query
  // Pass an array with all the appropriate query arguments
  // Invoke the passed-in callback, and pass in the results (query should do this automatically).


// };

/*

*/

// const updateComment = (req, res) => {
//   const newComment = {
//     id: req.body.id,
//     author: req.body.author,
//     authorIsCreator: req.body.authorIsCreator,
//     profilePicture: req.body.profilePicture,
//     createdAt: req.body.createdAt,
//     body: req.body.body,
//     replies: [],
//   };
// };
// const updateReply = (req, res) => {
//   const newComment = {
//     id: req.body.id,
//     author: req.body.author,
//     authorIsCreator: req.body.authorIsCreator,
//     profilePicture: req.body.profilePicture,
//     createdAt: req.body.createdAt,
//     body: req.body.body,
//   };
// };
// const deleteReply = (req, res) => {

// };
// const deleteComment = (req, res) => {

// };

module.exports = {
 /*TODO:*/ /*pool,*/ /*client,*/ getCommentsByProjectId, /*createComment,*/ /*createReply,*/ /*updateComment,*/ /*updateReply,*/ /*deleteComment,*/ /*deleteReply,*/
};
