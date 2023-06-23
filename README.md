# Music Streaming Application

Created by Ryan McKay, Owen Mastropietro and Soren Richenberg for our capstone project.
The UI is made with Javascript, React and MUI components.
The API is split into two parts, one part is made with KoaJS which handles sending over images and metadata, the other part, for streaming audio in chunks, is made with express, and was originally created by DingGGU https://gist.github.com/DingGGu/8144a2b96075deaf1bac, which we modified and added additional functionality to.
The Database is made with MySQL.

The repositories that we used midway through our project are currently still public and located here: https://github.com/Cosmic-Ripples

Originally the project used a larger preselected library of music, that was not stored on Github for copyright reasons. In order to have a small library of music available to use with the application, I have replaced the original library with some of my own music (© all rights reserved). I have also fixed a few visual and functional bugs with the UI.

## Setting up and running the Music Streaming Application
### Getting the files

1. In Github click "Code" and "Download ZIP", unzip the files and go then go to the root directory for the project. This directory should contain directories such as api and db-setup. You may need to open up multiple terminals here to start the ui and the two api-s.


### Creating and populating the database
	(This assumes you already have a database server setup and running)

2. Create the database:
	- `CREATE DATABASE music-streaming-application;`
	
3. (optional) If needed, create a new user
	- `CREATE USER 'userName'@'localhost' IDENTIFIED BY 'password here';`
	- `CREATE USER 'userName'@'%' IDENTIFIED BY 'same password here';`
	
4. If needed, set permissions for the user you are using
	- `GRANT ALL PRIVILEGES ON music-streaming-application.* TO 'userName'@'localhost' WITH GRANT OPTION;`
	- `GRANT ALL PRIVILEGES ON music-streaming-application.* TO 'userName'@'%' WITH GRANT OPTION;`


5. Use `music-streaming-application\db-setup\MSDB_DDL.sql` to build out the tables

6. Use `music-streaming-application\db-setup\MSDB_INSERT_DEV_DATA.sql` to fill the tables with data

### Setting up the KoaJS API

7. Navigate to `koa-api` and run `npm install` to install the dependencies.


8. Go to `koa-api\database\connection_template.js` and modify the following:

   - Set the port field to the port for your database server
   - Set user and password to the username and password for the account you gave the proper privileges for this database to
   
9. Rename `connection_template.js` to `connection.js`


10. Run `node api.js` to start the Koa server.


### Setting up the audio streaming API


11. Navigate to `stream-api` and run `npm install` to install the dependencies.


12. Run `node api.js` to start the API server. 


(Important note: stream-api should be started after koa-api has already been started. If the order is reversed, stream-api may not start with the correct data it needs from koa-api. To fix this, stop both koa-api and stream-api, and then start koa-api first, then stream-api)


### Setting up the UI


13. Navigate to `ui` and run `npm install` to install the dependencies.


14. Run `npm start` to start the UI server.


15. If not automatically opened, navigate to `http://localhost:3000` in your browser to view the application.
