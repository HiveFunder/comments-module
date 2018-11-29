var fs = require('fs');
const path = require('path');

const { Client } = require('pg')

// CONFIGURED FOR EC2 INSTANCE! comment out line 6 and uncomment line 7 for dev env.
const config = require('../ec2config.js');
// const config = require('../config.js');


let startTime = new Date().getTime();
const projectsToImport = 10;

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
//--------------

const seedPostgresData = () => {
  let csvData = path.resolve(__dirname, './bulkProjects.csv');

  startTime = new Date().getTime();

  client.query(`\copy projects(_id, author, comments) FROM '${csvData}' CSV HEADER;`)
    .then((results) => {
        console.log(`Seeded campaigns in ${new Date().getTime() - startTime} ms`);
        client.end();
    })
    .catch((err) => {
      console.error(err)
      client.end();
    });
}

seedPostgresData();