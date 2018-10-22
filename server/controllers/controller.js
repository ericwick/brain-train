const getAllUsers = (req, res, next) => {
  const dbInst = req.app.get("db");
  dbInst
    .get_users()
    .then(response => {
      // console.log(response);
      res.status(200).json(response);
    })
    .catch(err => console.log(`Error in get_users() - ${err}`));
};

const getUser = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { username } = req.body;
  req.session.username = username;
  dbInst
    .get_user(username)
    .then(response => res.status(200).json(req.session.user))
    .catch(err => console.log(`Error in get_users() - ${err}`));
};

const currentUser = (req, res, next) => {
  // console.log(req.session, "req.session currentUser");
  // console.log(req.session.user, "req.session.user currentUser");
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
    .add_user(username, password)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err =>
      dbInst
        .get_user(username)
        .then(response => res.status(200).json(req.session.user))
    );
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

// const users = require("../models/users");

// var id = 1;

// module.exports = {
//   login: (req, res, next) => {
//     if (
//       req.session.user.username === req.body.username &&
//       req.session.user.password === req.body.password
//     ) {
//       req.session.user.username = req.body.username;
//       res.status(200).json(req.session.user);
//     } else {
//       res.status(500).json("UNAUTHORIZED");
//     }
//   },
//   register: (req, res, next) => {
//     users.push(id, req.body.username, req.body.password);
//     id++;
//     req.session.user.username = req.body.username;
//     res.status(200).json(req.session.user);
//   },
//   signout: (req, res, next) => {
//     req.session.destroy();
//     res.status(200).json(req.session);
//   },
//   getUser: (req, res, next) => {
//     res.status(200).json(req.session.user);
//   }
// };
