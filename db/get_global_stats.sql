SELECT users.uid, username, gid, time_start, time_end, score FROM global_stats
JOIN users ON global_stats.uid = users.uid
ORDER BY score DESC;