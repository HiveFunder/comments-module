const mongoose = require('mongoose');
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
  comments: Array,
});

const Project = mongoose.model('Project', projectSchema);

module.exports.Project = Project;
