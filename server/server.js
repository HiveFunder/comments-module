const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Project = require('../database/index.js').Project;

const app = express();

const port = 8081;

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/:authorName/bundle.js/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/dist/bundle.js'))
})

app.get('/:authorName/style.css/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/dist/style.css'))
})

app.get('/:authorName/:projectId/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/dist/index.html'))
});

app.get('/:authorName/:projectId/comments', (req, res) => {
  let id = parseInt(req.params.projectId);
  console.log(id, typeof id);
  Project.findOne({"_id": 15})
    .then((results) => {
      res.status(200).send(JSON.stringify(results))
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

app.get('/:authorName/querySpeed/comments', (req, res) => {
  console.log('Hello from querySpeed Tests!!');
  const start = new Date().getTime();
  let end;
  let randomId;
  for (let i = 0; i < 10000; i += 1) {
    Project.findById(Math.floor(Math.random() * 1000) - 1 + 999000)
      .then((results) => {
        if (i === 0 || i === 9 || i === 99 || i === 999 || i === 9999) {
          end = new Date().getTime();
          console.log(`Completed ${i + 1} queries at ${start - end} qps!`);
        }
        if (i === 9999) {
          res.send('All done!');
        }
      })
      .catch((error) => {
        console.error(`Something went wrong at query no. ${i}! Error:`, error);
      })
  }
});

app.post('/:authorName/:projectId', (req, res) => {
  Project.findOne({"_id": req.params.projectId})
    .then((results) => {
      results.comments.push({
        author: req.body.author,
        authorIsCreator: req.body.authorIsCreator,
        profilePicture: req.body.profilePicture,
        createdAt: req.body.createdAt,
        body: req.body.body,
        replies: [],
      });
      results.save()
        .then((results) => {
          res.status(201).send('Post succeeded!')
        })
        .catch((err) => {
          console.error('POST failed! Could not save results. Error:', err);
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      console.error('POST failed! Could not find project. Error:', err);
      res.status(400).send(err);
    });
});

app.post('/:authorName/:projectId/:commentId', (req, res) => {
  const newComment = {
    id: req.body.id,
    author: req.body.author,
    authorIsCreator: req.body.authorIsCreator,
    profilePicture: req.body.profilePicture,
    createdAt: req.body.createdAt,
    body: req.body.body,
    replies: [],
  };
  Project.findOneAndUpdate(
    {"_id": req.params.projectId},
    {
      $push: {
        "comments.$[comment].replies": newComment
      }
    },
    {
      arrayFilters: [ { "comment.id": parseInt(req.params.commentId) } ]
    }
  )
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error('DELETE failed! Could not update. Error:', err);
      res.status(400).send(err);
    })
});

app.put('/:authorName/:projectId/:commentId', (req, res) => {
  const newComment = {
    id: req.body.id,
    author: req.body.author,
    authorIsCreator: req.body.authorIsCreator,
    profilePicture: req.body.profilePicture,
    createdAt: req.body.createdAt,
    body: req.body.body,
    replies: [],
  };
  Project.findOneAndUpdate(
    {"_id": req.params.projectId},
    {
      $set: {
        [`comments.$[comment]`]: newComment
      }
    },
    {
      arrayFilters: [ { "comment.id": parseInt(req.params.commentId) } ]
    },
  )
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error('PUT failed! Could not update. Error:', err);
      res.status(400).send(err);
    })
});

app.put('/:authorName/:projectId/:commentId/:replyId', (req, res) => {
  const newComment = {
    id: req.body.id,
    author: req.body.author,
    authorIsCreator: req.body.authorIsCreator,
    profilePicture: req.body.profilePicture,
    createdAt: req.body.createdAt,
    body: req.body.body,
    replies: [],
  };
  Project.findOneAndUpdate(
    {"_id": req.params.projectId},
    {
      $set: {
        "comments.$[comment].replies.$[reply]": newComment
      }
    },
    {
      arrayFilters: [ { "comment.id": parseInt(req.params.commentId) }, {"reply.id": parseInt(req.params.replyId)} ]
    },
  )
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error('PUT failed! Could not update. Error:', err);
      res.status(400).send(err);
    })
});

app.delete('/:authorName/:projectId/:commentId/:replyId', (req, res) => {
  Project.findOneAndUpdate(
    {"_id": req.params.projectId},
    {
      $pull: {
        "comments.${req.params.commentId}.replies": {
          id: parseInt(req.params.replyId)
        }
      }
    },
    {new: true}
  )
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error('DELETE failed! Could not update. Error:', err);
      res.status(400).send(err);
    })
});

app.delete('/:authorName/:projectId/:commentId', (req, res) => {
  Project.findOneAndUpdate(
    {"_id": req.params.projectId},
    {
      $pull: { comments: {
          id: parseInt(req.params.commentId)
        }
      }
    },
    {new: true}
  )
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error('DELETE failed! Could not update. Error:', err);
      res.status(400).send(err);
    })
});

app.listen(port, () => {
  console.log(`listening on port ${port}!\n_________________\n\n`);
});
