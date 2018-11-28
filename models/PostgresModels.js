//DB connection------------------------------------

const { Client } = require('pg')

// CONFIGURED FOR EC2 INSTANCE! comment out line 6 and uncomment line 7 for dev env.
const config = require('../ec2config.js');
// const config = require('../config.js');

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
  const queryArgs = [ commentId, newComment, projectId ];
  client.query('UPDATE projects SET comments=((SELECT comments -> -1 FROM projects WHERE _id=$4) || $3) WHERE id=$3', queryArgs, callback); // Currently relies on Server as source of truth.
};

const createReply = (projectId, commentId, replyId, newComment, callback) => {
  const queryArgs = [ commentId, replyId, newComment, projectId ];
  client.query('UPDATE projects SET comments=((SELECT comments -> $1 -> replies -> -1 FROM projects WHERE _id=$4 || $3) || $3) WHERE _id=$4;', queryArgs, callback);
};

//    STRETCH GOALS
// -------------------
// const updateComment = (projectId, commentId, replyId, newComment, callback) => {

// };

// const updateReply = (req, res) => {

// };

// const deleteReply = (req, res) => {

// };

// const deleteComment = (req, res) => {

// };

module.exports = {
 getCommentsByProjectId,
 createComment,
 createReply,
 // TODO:
 // updateComment,
 // updateReply,
 // deleteComment,
 // deleteReply,
};
