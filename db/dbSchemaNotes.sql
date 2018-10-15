CREATE TABLE users
( 
  uid SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  profile_pic TEXT DEFAULT 'https://explainxkcd.com/wiki/images/6/6d/BlackHat_head.png'
);

CREATE TABLE global_stats
( 
  uid INTEGER NOT NULL,
  gid INTEGER NOT NULL,
  time_start TIMESTAMP NOT NULL, --Must be supplied by the post script
  time_end TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  score INTEGER NOT NULL
);

CREATE TABLE global_games
( 
  -- Maybe alter this to allow 2 cats per game
  gid SERIAL PRIMARY KEY,
  game_name VARCHAR(50) NOT NULL UNIQUE,
  game_cat VARCHAR(50) NOT NULL,
  game_desc TEXT DEFAULT 'This is a game and we couldnt think of anything to say about it'
);

INSERT INTO users (username, password)
VALUES ('user', 'password');

INSERT INTO global_stats (uid, gid, time_start, time_end, score)
VALUES(1, 1, '2018-10-15T15:20:19.109624Z', '2018-10-15T15:49:55.058379Z', 2500),
      (1, 2, '2018-10-15T15:49:55.058379Z', '2018-10-15T16:06:41.2315Z', 5300);

INSERT INTO global_games (game_name, game_cat, game_desc)
VALUES('Make Me a Match', 'memory', 'Flip over cards to make pairs. Get as many matches in as few moves as possible.'),
      ('Speed Match', 'logic', 'Match the given card to its closest match. Do it fast for a time bonus.');