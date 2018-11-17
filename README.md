Hello and welcome to my comments module!

To run this file, please run 'npm install' first to install the dependencies.
The database must be seeded. This can be done by running the script 'npm run seedDB'.
Then, run 'npm run dev' to start webpack, and 'npm run start' to start the server.
The page will show up on 'localhost:3001' in the browser.

This is a single module in a 4 module application. The project's repo can be found at: https://github.com/FEC-Kickstand
My repository for this single comments module can be found at: https://github.com/FEC-Kickstand/comments-module

Thank you for reading my README file and I hope you like my module :D

##CRUD API documentation

###Routes

####Create
- [Creating a Comment on a project] POST /:authorName/:projectId

####Read
- [Getting all comments for a project] GET /:authorName/:projectId

####Update
- [Editing a comment on a project] PUT /:authorName/:projectId/:commentId

####Delete
- [Deleting a comment on a project] DELETE /:authorName/:projectId/:commentId

