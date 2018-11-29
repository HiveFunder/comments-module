require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Models = require('../models/PostgresModels.js');
const app = express();

const port = 80;

const deleteCallback = (dbErr, dbRes) => {
  if (dbErr) {
    console.log(dbErr)
    res.status(500).send();
  } else {
    console.log(dbRes.rows[0]);
    res.status(204).send();
  }
};

let cache = [];

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/images/:imageURL/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, `../images/${req.params.imageURL}`))
})

app.get('/bundle.js/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/dist/bundle.js'))
})

app.get('/style.css/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/dist/style.css'))
})

app.get('/:projectId/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/dist/index.html'))
});


app.get('/:projectId/comments', (req, res) => {
  if(cache[req.params.projectId])
  Models.getCommentsByProjectId(req.params.projectId, (dbErr, dbRes) => {
    if (dbErr) {
      console.log(dbErr)
      res.status(500).send();
    } else {
      res.send(dbRes.rows[0]);
    }
  });
});

app.post('/:projectId', (req, res) => {
  Models.createComment(req.params.projectId, req.body, (dbErr, dbRes) => {
    if (dbErr) {
      console.log(dbErr)
      res.status(500).send();
    } else {
      console.log(dbRes.rows[0]);
      res.status(201).send();
    }
  });
});

app.post('/:projectId/:commentId', (req, res) => {
  Models.createReply(req.params.projectId, req.params.commentId, req.body, (dbErr, dbRes) => {
    if (dbErr) {
      console.log(dbErr)
      res.status(500).send();
    } else {
      console.log(dbRes.rows[0]);
      res.status(204).send();
    }
  });
});

app.put('/:projectId/:commentId', (req, res) => {

  // Models.updateComment(req.params.projectId, req.params.commentId, (dbErr, dbRes) => {
  //   if (dbErr) {
  //     console.log(dbErr)
  //     res.status(500).send();
  //   } else {
  //     console.log(dbRes.rows[0]);
  //     res.status(204).send();
  //   }
  // });

  // DELETE BELOW WHEN COMPLETE:
  res.send(/*TODO*/);
});

app.put('/:projectId/:commentId/:replyId', (req, res) => {
  // Models.updateReply(req, res);

  // DELETE BELOW WHEN COMPLETE:
  res.send(/*TODO*/);
});

app.delete('/:projectId/:commentId/:replyId', (req, res) => {

  // // Models.deleteReply(req, res);
  // DELETE BELOW WHEN COMPLETE:
  res.send(/*TODO*/);
});

app.delete('/:projectId/:commentId', (req, res) => {
  // Models.deleteComment(req, res);

  // DELETE BELOW WHEN COMPLETE:
  res.send(/*TODO*/);
});

app.listen(port, () => {
  console.log(`listening on port ${port}!\n_________________\n\n`);
});
