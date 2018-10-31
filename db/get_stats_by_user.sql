SELECT s.stat_index, s.time_start, s.time_start, s.score, g.game_name
FROM global_stats s
INNER JOIN global_games g ON g.gid = s.gid
WHERE uid = 1;