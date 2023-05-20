# Setting up and running the Music Streaming Application




<Getting the files>
1. In Github click "Code" and "Download ZIP", unzip the files and go then go to the root directory for the project. 
   This directory should contain directories such as api and db-setup.
   You may need to open up multiple terminals here to start the ui and the two api-s.


<Creating and populating the database>
(This assumes you already have a database server setup and running)


5. Create the database: 
	CREATE DATABASE music-streaming-application;
	
6. (optional) If needed, create a new user
	CREATE USER 'userName'@'localhost' IDENTIFIED BY 'password here';
	CREATE USER 'userName'@'%' IDENTIFIED BY 'same password here';
	
7. If needed, set permissions for the user you are using
	GRANT ALL PRIVILEGES ON music-streaming-application.* TO 'userName'@'localhost' WITH GRANT OPTION;
	GRANT ALL PRIVILEGES ON music-streaming-application.* TO 'userName'@'%' WITH GRANT OPTION;


8. Use music-streaming-application\db-setup\MSDB_DDL.sql to build out the tables

9. Use music-streaming-application\db-setup\MSDB_INSERT_DEV_DATA.sql to fill the tables with data

<koa api>

5. Navigate to `koa-api` and run `npm install` to install the dependencies.


6. Go to koa-api\database\connection_template.js and modify the following:

   - Set the port field to the port for your database server
   - Set user and password to the username and password for the account you gave the proper privileges for this database to
   
7. Rename connection_template.js to connection.js


7. Run `node api.js` to start the Koa server.


<express api>


8. Navigate to `stream-api` and run `npm install` to install the dependencies.


9. Run `node api.js` to start the API server. 


(Important note: the stream api should be started after the koa API has already been started. If the order is reversed, the stream api may not start with the correct data it needs from koa. To fix this, stop both the koa api and the stream api, and then start the koa api first, then the stream api)


<ui>


10. Navigate to `ui` and run `npm install` to install the dependencies.


11. Run `npm start` to start the UI server.


12. If not automatically opened, navigate to `http://localhost:3000` in your browser to view the application.