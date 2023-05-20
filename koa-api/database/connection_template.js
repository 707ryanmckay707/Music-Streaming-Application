const mysql = require('mysql');

const connection = mysql.createConnection({
    debug: false,
    host: '127.0.0.1', // localhost
    port: 3306, //replace with the port of your database server
    database: 'music_streaming_application',
    user: 'database_username_here',
    password: 'database_password_here',
});

module.exports = connection;
