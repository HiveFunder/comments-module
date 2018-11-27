const { Client } = require('pg');
const config = require('../config.js');
const connectionString = `postgresql://${config.PGUSER}:${config.PGPASSWORD}@${config.PGHOST}:${config.PGPORT}/${config.PGDATABASE}`

const client = new Client({
  connectionString: connectionString,
})
client.connect();

module.exports = client;
