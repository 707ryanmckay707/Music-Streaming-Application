USE music_streaming_application;

-- Insertion -------------------------------------------------------------------
DELETE FROM Track;
DELETE FROM Album;
DELETE FROM Artist;

INSERT INTO Artist (`Name`, Country, Image_Path) VALUES ('Ryan McKay', 'US', 'Ryan McKay/artist.png');

-- Ryan McKay
SET @current_artist = (SELECT ID FROM Artist WHERE `Name` = 'Ryan McKay');

INSERT INTO Album (Artist_ID, Title, `Year`, Cover_Path) VALUES (@current_artist, "Shimmer", 2020, 'Ryan McKay/Shimmer/cover.png');
SET @current_album = (SELECT ID FROM Album WHERE Title = "Shimmer");
INSERT INTO Track (Artist_ID, Album_ID, Title, `Length`, `Path`, Track_Number) VALUES (@current_artist, @current_album, 'Shimmer', '00:03:37', 'Ryan McKay/Shimmer/Shimmer.mp3', 1);

INSERT INTO Album (Artist_ID, Title, `Year`, Cover_Path) VALUES (@current_artist, "All I've Got", 2021, "Ryan McKay/All I've Got/cover.jpg");
SET @current_album = (SELECT ID FROM Album WHERE Title = "All I've Got");
INSERT INTO Track (Artist_ID, Album_ID, Title, `Length`, `Path`, Track_Number) VALUES (@current_artist, @current_album, "All I've Got", "00:02:54", "Ryan McKay/All I've Got/All I've Got.mp3", 1);

INSERT INTO Album (Artist_ID, Title, `Year`, Cover_Path) VALUES (@current_artist, "Shift", 2021, "Ryan McKay/Shift/cover.jpg");
SET @current_album = (SELECT ID FROM Album WHERE Title = "Shift");
INSERT INTO Track (Artist_ID, Album_ID, Title, `Length`, `Path`, Track_Number) VALUES (@current_artist, @current_album, "Shift", "00:03:18", "Ryan McKay/Shift/Shift.mp3", 1);