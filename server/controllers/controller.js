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

const getGamesList = (req, res, next) => {
  const dbInst = req.app.get("db");
  dbInst
    .get_games_list()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_games_list() - ${err}`));
};

const addUser = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { uname, pword } = req.body;
  dbInst
    .add_user(uname, pword)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_user() - ${err}`));
};

const addGameSessionResults = (req, res, next) => {
  const dbInst = req.app.get("db");
  res.status(200).json();
};

const editUserInfo = (req, res, next) => {
  const dbInst = req.app.get("db");
  res.status(200).json();
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

module.exports = {
  getAllUsers,
  getUser,
  getUsersGameStats,
  getGameStats,
  getGamesList,
  addUser,
  addGameSessionResults,
  editUserInfo,
  editUserAchievements,
  editUserScores,
  removeUser,
  removeUserStats
};
