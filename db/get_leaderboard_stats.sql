SELECT users.uid, username, gid, score FROM global_stats
JOIN users ON global_stats.uid = users.uid WHERE gid = $1 ORDER BY score DESC LIMIT $2; 
