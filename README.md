Hello and welcome to my comments module!

To run this file, please run 'npm install' first to install the dependencies.

The database must be seeded. This can be done by running npm generateCSV, and then running the postgres copy command targeting the resulting csv file creating a table in the shape of schema.sql.

Then, run 'npm run dev' to start webpack, and 'npm run start' to start the server.
The page will show up on 'localhost:3001' in the browser.

This is a single module in a 4 module application. The project's repos can be found at the following sites:

Original Front-end modules:
https://github.com/FEC-Kickstand/

This service's original Front-end module:
https://github.com/FEC-Kickstand/comments-module

Full-stack modules:
https://github.com/HiveFunder

This service's Full-stack module:
https://github.com/HiveFunder/comments-module


## CRUD API documentation

### Routes

#### Create
- [Creating a Comment on a project] POST /:authorName/:projectId
- [Creating a Reply on a project] POST /:authorName/:projectId/:commentId

#### Read
- [Getting index.html for a project] GET /:authorName/:projectId/index.html
- [Getting styles.css for a project] GET /:authorName/:projectId/styles.css
- [Getting bundle.js for a project] GET /:authorName/:projectId/bundle.js
- [Getting all comments for a project] GET /:authorName/:projectId/comments

#### Update
- [Editing a comment on a project] PUT /:authorName/:projectId/:commentId
- [Editing a reply on a project] PUT /:authorName/:projectId/:commentId/:replyId

#### Delete
- [Deleting a comment on a project] DELETE /:authorName/:projectId/:commentId
- [Deleting a reply on a project] DELETE /:authorName/:projectId/:commentId/:replyId
