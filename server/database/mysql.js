const knex = require('knex');

const mysql = knex({
  // Enter your own database information here based on what you created and run the SQL_Statements to create the tables
  client: 'mysql',
  connection: {
    host : 'localhost',           // Your hostname
    user : 'root',                // Your user name
    password : 'PasswordMLDB',    // Your password
    database : 'mldb'
  }
});

module.exports = { mysql };