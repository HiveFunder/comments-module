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
  client.query('SELECT * FROM projects WHERE _id = $1', [projectId], callback);
};

const createComment = (projectId, commentId, newComment, callback) => {
  client.query('UPDATE projects SET (id, body, author, replies, createdAt, profilePicture) VALUES($1, $2, $3, $4, $5)',
    [
      newComment.id,
      newComment.body,
      newComment.author,
      newComment.replies,
      newComment.createdAt,
      newComment.profilePicture
    ],
    callback
  );
};

// TODO:-----------------------------------------
// const createReply = (req, res) => {
//   const newComment = {
//     id: req.body.id,
//     author: req.body.author,
//     authorIsCreator: req.body.authorIsCreator,
//     profilePicture: req.body.profilePicture,
//     createdAt: req.body.createdAt,
//     body: req.body.body,
//   };
// };
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
