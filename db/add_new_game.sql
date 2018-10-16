-- Add a game listing to the DB. WILL NOT add any functionality.
-- Only allow admins to access this script.
INSERT INTO global_games (game_name, game_cat, game_desc)
VALUES($1, $2, $3);