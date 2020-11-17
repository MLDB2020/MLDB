CREATE SCHEMA mldb;

USE mldb;

CREATE TABLE 'user' (
  'userID' int NOT NULL,
  'userName' varchar(64) NOT NULL,
  'password' varchar(64) NOT NULL,
  'userType' varchar(64) DEFAULT NULL,
  'firstName' varchar(64) NOT NULL,
  'lastName' varchar(256) NOT NULL,
  'email' varchar(64) NOT NULL,
  'phone' varchar(11) DEFAULT NULL,
  'street' varchar(256) NOT NULL,
  'city' varchar(64) NOT NULL,
  'state' varchar(64) NOT NULL,
  'zipCode' int NOT NULL,
  'preferableGenre' varchar(256) DEFAULT NULL,
  'createdTs' timestamp NULL DEFAULT NULL,
  'updatedTs' timestamp NULL DEFAULT NULL,
  PRIMARY KEY ('userID'),
  UNIQUE KEY 'userName_UNIQUE' ('userName'),
  UNIQUE KEY 'email_UNIQUE' ('email')
);

CREATE TABLE 'movie' (
  'movieID' int NOT NULL,
  'userID' int NOT NULL,
  'movieType' varchar(64) NOT NULL,
  'favoritedMovie' varchar(256) NOT NULL,
  'description' varchar(256) NOT NULL,
  'rating' int DEFAULT NULL,
  'review' varchar(256) DEFAULT NULL,
  'createdTs' timestamp NULL DEFAULT NULL,
  PRIMARY KEY ('movieID'),
  KEY 'userID_fk_mv_idx' ('userID'),
  CONSTRAINT 'userID_fk_mv' FOREIGN KEY ('userID') REFERENCES 'user' ('userID')
);

CREATE TABLE 'movie theater' (
  'movieTheaterID' int NOT NULL,
  'userID' int NOT NULL,
  'storeName' varchar(256) NOT NULL,
  'street' varchar(256) NOT NULL,
  'city' varchar(64) NOT NULL,
  'state' varchar(64) NOT NULL,
  'zipCode' int NOT NULL,
  'latitude' double DEFAULT NULL,
  'longitude' double DEFAULT NULL,
  'startDate' date NOT NULL,
  'createdTs' timestamp NULL DEFAULT NULL,
  PRIMARY KEY ('movieTheaterID'),
  KEY 'userID_fk_idx' ('userID'),
  CONSTRAINT 'userID_fk' FOREIGN KEY ('userID') REFERENCES 'user' ('userID')
);

CREATE TABLE 'ticket' (
  'ticketID' int NOT NULL,
  'movieID' int NOT NULL,
  'movieTheaterID' int NOT NULL,
  'paymentAmount' double NOT NULL,
  'numberOfTickets' int NOT NULL,
  'createdTs' timestamp NULL DEFAULT NULL,
  PRIMARY KEY ('ticketID'),
  KEY 'movieID_fk_tk_idx' ('movieID'),
  KEY 'movieTheaterID_fk_tk_idx' ('movieTheaterID'),
  CONSTRAINT 'movieID_fk_tk' FOREIGN KEY ('movieID') REFERENCES 'movie' ('movieID'),
  CONSTRAINT 'movieTheaterID_fk_tk' FOREIGN KEY ('movieTheaterID') REFERENCES 'movie theater' ('movieTheaterID')
);

CREATE TABLE 'feedback' (
  'feedbackID' int NOT NULL,
  'userID' int NOT NULL,
  'movieTheaterID' int NOT NULL,
  'feedbackGiven' varchar(256) DEFAULT NULL,
  'createdTs' timestamp NULL DEFAULT NULL,
  PRIMARY KEY ('feedbackID'),
  KEY 'userID_fk_fb_idx' ('userID'),
  KEY 'movieTheaterID_fk_fb_idx' ('movieTheaterID'),
  CONSTRAINT 'movieTheaterID_fk_fb' FOREIGN KEY ('movieTheaterID') REFERENCES 'movie theater' ('movieTheaterID'),
  CONSTRAINT 'userID_fk_fb' FOREIGN KEY ('userID') REFERENCES 'user' ('userID')
);

CREATE TABLE 'order' (
  'orderID' int NOT NULL,
  'userID' int NOT NULL,
  'ticketID' int NOT NULL,
  'paymentAmount' double NOT NULL,
  'createdTs' timestamp NULL DEFAULT NULL,
  PRIMARY KEY ('orderID'),
  KEY 'userID_fk_or_idx' ('userID'),
  KEY 'ticketID_fk_or_idx' ('ticketID'),
  CONSTRAINT 'ticketID_fk_or' FOREIGN KEY ('ticketID') REFERENCES 'ticket' ('ticketID'),
  CONSTRAINT 'userID_fk_or' FOREIGN KEY ('userID') REFERENCES 'user' ('userID')
);

CREATE TABLE 'plays' (
  'moviesPlayingID' int NOT NULL,
  'movieID' int DEFAULT NULL,
  'movieTheaterID' int DEFAULT NULL,
  PRIMARY KEY ('moviesPlayingID'),
  KEY 'movieID_fk_play_idx' ('movieID'),
  KEY 'movieTheater_fk_play_idx' ('movieTheaterID'),
  CONSTRAINT 'movieID_fk_play' FOREIGN KEY ('movieID') REFERENCES 'movie' ('movieID'),
  CONSTRAINT 'movieTheater_fk_play' FOREIGN KEY ('movieTheaterID') REFERENCES 'movie theater' ('movieTheaterID')
);


