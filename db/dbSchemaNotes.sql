CREATE TABLE users
( 
  uid SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  profile_pic TEXT DEFAULT 'https://explainxkcd.com/wiki/images/6/6d/BlackHat_head.png'
);

CREATE TABLE global_stats
( 
  stat_index SERIAL PRIMARY KEY,
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
      (1, 2, '2018-10-15T15:49:55.058379Z', '2018-10-15T16:06:41.2315Z', 5300),
      (1, 1, '2018-10-15T20:20:19.109Z', '2018-10-15T20:49:55.058Z', 2500),
      (1, 2, '2018-10-15T20:49:55.058Z', '2018-10-15T21:06:41.231Z', 5300),
      (2, 1, '2018-10-16T02:25:53.860Z', '2018-10-16T02:38:12.120Z', 2600),
      (3, 2, '2018-10-16T07:38:12.120Z', '2018-10-16T02:39:46.995Z', 3200),
      (3, 2, '2018-10-16T08:43:30.661Z', '2018-10-16T08:44:06.020Z', 1200);

INSERT INTO global_games (game_name, game_cat, game_desc)
VALUES('Make Me a Match', 'memory', 'Flip over cards to make pairs. Get as many matches in as few moves as possible.'),
      ('Speed Match', 'logic', 'Match the given card to its closest match. Do it fast for a time bonus.');


--leaderboards stats 
SELECT users.uid, username, gid, time_start, time_end, score FROM global_stats
JOIN users ON global_stats.uid = users.uid;


--sorting scores by gameID 

SELECT users.uid, username, gid, score FROM global_stats
JOIN users ON global_stats.uid = users.uid WHERE gid = $1 ORDER BY score DESC LIMIT $2; 


