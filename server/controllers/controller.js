// NEED TO ORGANIZE DATABASE IN A WAY THAT MAKES SENSE AND RESTRUCTURE THE CONTROLLER/SERVER SO THAT THE DATA FLOW FROM FRONT TO BACK IS ORGANIZED AND EASY TO FOLLOW

const attemptLogin = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { username, password } = req.body;
  console.log("received", username, "and", password);
  dbInst
    .login([username, password])
    .then(response => {
      console.log("response", response);
      res.status(200).json(response);
    })
    .catch(err => console.log(`Error in login() - ${err}`));
};

const getAllUsers = (req, res, next) => {
  const dbInst = req.app.get("db");
  dbInst
    .get_users()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log(`Error in get_users() - ${err}`));
};

const getUser = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { id } = req.params;
  // req.session.username = username;
  dbInst
    .get_user(id)
    .then(response => res.status(200).json(response))
    .catch(err => console.log(`Error in get_users() - ${err}`));
};

const currentUser = (req, res, next) => {
  res.status(200).json(req.session.user);
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
  const { username, password } = req.body;
  dbInst
    .add_user([username, password])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      if (err.code === "23505") {
        res.sendStatus(409);
      } else {
        console.log(`Error in adduser() - ${err}`);
      }
    });
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

const logout = (req, res, next) => {
  req.session.destroy();
  res.status(200).json(req.session);
};

module.exports = {
  attemptLogin,
  getAllUsers,
  getUser,
  currentUser,
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
