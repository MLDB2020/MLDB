CREATE SCHEMA mldb;

USE mldb;

CREATE TABLE user (
  userID int NOT NULL,
  userName varchar(64) NOT NULL,
  password varchar(64) NOT NULL,
  firstName varchar(64) NOT NULL,
  lastName varchar(256) NOT NULL,
  email varchar(64) NOT NULL,
  street varchar(256) NULL,
  city varchar(64) NULL,
  state varchar(64) NULL,
  zipCode int NULL,
  preferableGenre varchar(256) DEFAULT NULL,
  PRIMARY KEY (userID),
  UNIQUE KEY userName_UNIQUE (userName),
  UNIQUE KEY email_UNIQUE (email)
);

CREATE TABLE movie (
  movieID int NOT NULL,
  userID int NOT NULL,
  movieType varchar(64) NOT NULL,
  description varchar(256) NOT NULL,
  rating int DEFAULT NULL,
  review varchar(256) DEFAULT NULL,
  PRIMARY KEY (movieID),
  KEY userID_fk_mv_idx (userID),
  CONSTRAINT userID_fk_mv FOREIGN KEY (userID) REFERENCES user (userID)
);

CREATE TABLE movie_theater (
  movieTheaterID int NOT NULL,
  storeName varchar(256) NOT NULL,
  street varchar(256) NOT NULL,
  city varchar(64) NOT NULL,
  state varchar(64) NOT NULL,
  zipCode int NOT NULL,
  PRIMARY KEY (movieTheaterID)
);

CREATE TABLE plays (
  moviesPlayingID int NOT NULL,
  movieID int DEFAULT NULL,
  movieTheaterID int DEFAULT NULL,
  PRIMARY KEY (moviesPlayingID),
  KEY movieID_fk_play_idx (movieID),
  KEY movieTheater_fk_play_idx (movieTheaterID),
  CONSTRAINT movieID_fk_play FOREIGN KEY (movieID) REFERENCES movie (movieID),
  CONSTRAINT movieTheater_fk_play FOREIGN KEY (movieTheaterID) REFERENCES movie_theater (movieTheaterID)
);

CREATE TABLE ticket (
  ticketID int NOT NULL,
  userID int NOT NULL,
  moviesPlayingID int NOT NULL,
  paymentAmount double NOT NULL,
  numberOfTickets int NOT NULL,
  PRIMARY KEY (ticketID),
  KEY userID_fk_tk_idx (userID),
  KEY moviesPlayingID_fk_tk_idx (moviesPlayingID),
  CONSTRAINT userID_fk_tk FOREIGN KEY (userID) REFERENCES user (userID),
  CONSTRAINT moviesPlayingID_fk_tk FOREIGN KEY (moviesPlayingID) REFERENCES plays (moviesPlayingID)
);

CREATE TABLE feedback (
  feedbackID int NOT NULL,
  userID int NOT NULL,
  feedbackGiven varchar(256) DEFAULT NULL,
  PRIMARY KEY (feedbackID),
  KEY userID_fk_fb_idx (userID),
  CONSTRAINT userID_fk_fb FOREIGN KEY (userID) REFERENCES user (userID)
);

CREATE TABLE ticket_order (
  orderID int NOT NULL,
  userID int NOT NULL,
  ticketID int NOT NULL,
  paymentAmount double NOT NULL,
  PRIMARY KEY (orderID),
  KEY userID_fk_or_idx (userID),
  KEY ticketID_fk_or_idx (ticketID),
  CONSTRAINT ticketID_fk_or FOREIGN KEY (ticketID) REFERENCES ticket (ticketID),
  CONSTRAINT userID_fk_or FOREIGN KEY (userID) REFERENCES user (userID)
);
