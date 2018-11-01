SELECT users.uid, username, global_games.game_name, global_games.gid, time_start, time_end, score FROM global_stats
JOIN users ON global_stats.uid = users.uid
JOIN global_games ON global_games.gid = global_stats.gid
ORDER BY score DESC;