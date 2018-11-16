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

app.get(express.static(path.resolve(__dirname, '../client/dist')));
app.get('/:authorName/:projectId',  (req, res) => {
  console.log('request params:', req.params);
  Project.find({"projectId": req.params.projectId})
    .then((results) => {
      console.log('Project comments found! results:', results);
      res.status(200).send(JSON.stringify(results))
    })
    .catch((err) => {
      console.error('Project comments not found:', err);
      res.status(400).send(err);
    });
})

app.get('/:authorName/:projectId/comments', (req, res) => {
  console.log('request params:', req.params);
  Project.find({"projectId": req.params.projectId})
    .then((results) => {
      console.log('Project comments found! results:', results);
      res.status(200).send(JSON.stringify(results))
    })
    .catch((err) => {
      console.error('Project comments not found:', err);
      res.status(400).send(err);
    });
});

app.post('/:authorName/:projectId', (req, res) => {
  console.log('Hello from POST!');
  Project.find({"projectId": req.params.projectId})
    .then((results) => {
      console.log(results);
      results.comments.push({
        author: req.body.author,
        authorIsCreator: req.body.authorIsCreator,
        profilePicture: req.body.profilePicture,
        createdAt: req.body.createdAt,
        body: req.body.body,
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

app.put('/:authorName/:projectId/:commentId', (req, res) => {
  console.log('Hello from PUT!');
  Project.find({"projectId": req.params.projectId})
    .then((results) => {
      console.log(results);
      for(let i = 0; i < results.comments.length; i++) {
        if (results.comments[i].id === req.params.commentId) {
          results.comments[i] = {
            author: req.body.author,
            authorIsCreator: req.body.authorIsCreator,
            profilePicture: req.body.profilePicture,
            createdAt: req.body.createdAt,
            body: req.body.body,
          }
        }
      }
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

app.delete('/:authorName/:projectId/:commentId', (req, res) => {
  console.log('Hello from delete!');
  console.log('Hello from PUT!');
  Project.find({"projectId": req.params.projectId})
    .then((results) => {
      console.log(results);
      for(let i = 0; i < results.comments.length; i++) {
        if (results.comments[i].id === req.params.commentId) {
          results.comments = results.comments.splice() // splice out the comment at the  index of the comment
        }
      }
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

app.listen(port, () => {
  console.log('listening..............o.o');
});
