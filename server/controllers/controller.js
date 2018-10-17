const getAllUsers = (req, res, next) => {
  const dbInst = req.app.get("db");
  dbInst
    .get_users()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_users() - ${err}`));
};

const getUser = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { id } = req.params;
  dbInst
    .get_user(id)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_user() - ${err}`));
};

const getUsersGameStats = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { id } = req.params;
  dbInst
    .get_stats_by_user(id)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_stats_by_user() - ${err}`));
};

const getGameStats = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { id } = req.params;
  dbInst
    .get_global_stats()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_global_stats() - ${err}`));
};

const getLeaderboard = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { gid } = req.params;
  dbInst
    .get_leaderboard_stats([gid, 20])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_leaderboard_stats() - ${err}`));
};

const addUser = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { uname, pword } = req.body;
  dbInst
    .add_user([uname, pword])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_user() - ${err}`));
};

const addGameSessionResults = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { uid, gid, startTime, score } = req.body;
  dbInst
    .add_game_result([uid, gid, startTime, score])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_game_result() - ${err}`));
};

const editUserInfo = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { pword, pic } = req.body;
  const { id } = req.params;
  dbInst
    .edit_user_info([id, pword, pic])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in edit_user_info() - ${err}`));
};

const editUserAchievements = (req, res, next) => {
  //takes in a block of user info. Includes username, password, anon toggle, favorites, etc
  const dbInst = req.app.get("db");
  res.status(200).json();
};

const editUserScores = (req, res, next) => {
  const dbInst = req.app.get("db");
  res.status(200).json();
};

const removeUser = (req, res, next) => {
  const dbInst = req.app.get("db");
  res.status(200).json();
};

const removeUserStats = (req, res, next) => {
  const dbInst = req.app.get("db");
  res.status(200).json();
};

const getServerTime = (req, res, next) => {
  const dbInst = req.app.get("db");
  dbInst
    .get_current_time()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_current_time() - ${err}`));
};

module.exports = {
  getAllUsers,
  getUser,
  getUsersGameStats,
  getGameStats,
  addUser,
  addGameSessionResults,
  editUserInfo,
  editUserAchievements,
  editUserScores,
  removeUser,
  removeUserStats,
  getServerTime, 
  getLeaderboard
};
