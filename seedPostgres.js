var fs = require('fs');
const db = require('./database/index.js');
const path = require('path');

let startTime = new Date().getTime();
const projectsToImport = 10;


//--------------

const seedPostgresData = () => {
  let csvData = path.resolve(__dirname, './bulkProjects.csv');

  startTime = new Date().getTime();

  // Create campaign table, load to DB
  db.query(`CREATE TABLE IF NOT EXISTS projects (_id SERIAL PRIMARY KEY, author TEXT, comments JSON);`)
    .catch((err) => console.error(err) );
  db.query(`COPY projects(_id, author, comments) FROM '${csvData}' CSV HEADER;`)
    .catch((err) => console.error(err) );

  console.log(`Seeded campaigns in ${new Date().getTime() - startTime} ms`);

  db.end();
}

seedPostgresData();
