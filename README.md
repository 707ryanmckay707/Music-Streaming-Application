# Setting up and running the Music Streaming Application
<Getting the files>

1. In Github click "Code" and "Download ZIP", unzip the files and go then go to the root directory for the project. This directory should contain directories such as api and db-setup. You may need to open up multiple terminals here to start the ui and the two api-s.


### Creating and populating the database
	(This assumes you already have a database server setup and running)

2. Create the database:
	- CREATE DATABASE music-streaming-application;
	
3. (optional) If needed, create a new user
	- CREATE USER 'userName'@'localhost' IDENTIFIED BY 'password here';
	- CREATE USER 'userName'@'%' IDENTIFIED BY 'same password here';
	
4. If needed, set permissions for the user you are using
	- GRANT ALL PRIVILEGES ON music-streaming-application.* TO 'userName'@'localhost' WITH GRANT OPTION;
	- GRANT ALL PRIVILEGES ON music-streaming-application.* TO 'userName'@'%' WITH GRANT OPTION;


5. Use music-streaming-application\db-setup\MSDB_DDL.sql to build out the tables

6. Use music-streaming-application\db-setup\MSDB_INSERT_DEV_DATA.sql to fill the tables with data

### Setting up the KoaJS API

7. Navigate to `koa-api` and run `npm install` to install the dependencies.


8. Go to koa-api\database\connection_template.js and modify the following:

   - Set the port field to the port for your database server
   - Set user and password to the username and password for the account you gave the proper privileges for this database to
   
9. Rename connection_template.js to connection.js


10. Run `node api.js` to start the Koa server.


### Setting up the audio streaming API


11. Navigate to `stream-api` and run `npm install` to install the dependencies.


12. Run `node api.js` to start the API server. 


(Important note: the stream api should be started after the koa API has already been started. If the order is reversed, the stream api may not start with the correct data it needs from koa. To fix this, stop both the koa api and the stream api, and then start the koa api first, then the stream api)


### Setting up the UI


13. Navigate to `ui` and run `npm install` to install the dependencies.


14. Run `npm start` to start the UI server.


15. If not automatically opened, navigate to `http://localhost:3000` in your browser to view the application.
