const getAllUsers = (req, res, next) => {
  const dbInst = req.app.get("db");
  res.status(200).json();
};

const getUser = (req, res, next) => {
  const dbInst = req.app.get("db");
  res.status(200).json();
};

const getUserGameStats = (req, res, next) => {
  const dbInst = req.app.get("db");
  res.status(200).json();
};

const getGamesList = (req, res, next) => {
  const dbInst = req.app.get("db");
  res.status(200).json();
};

const addUser = (req, res, next) => {
  const dbInst = req.app.get("db");
  res.status(200).json();
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
  getUserGameStats,
  getGamesList,
  addUser,
  addGameSessionResults,
  editUserInfo,
  editUserAchievements,
  editUserScores,
  removeUser,
  removeUserStats
};
