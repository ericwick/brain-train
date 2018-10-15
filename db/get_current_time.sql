-- Used to record the start time for a game. Hold this value until the user completes the game.
-- Avoid getting the start time from existing DB entries to prevent incomplete stats.
SELECT NOW();