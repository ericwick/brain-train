const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const cors = require("cors");
require("dotenv").config();

const port = process.env.SERVER_PORT || 3001;

const {
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
} = require("./controllers/controller");

const {
  getGamesList,
  addNewGame,
  getGAMEDATA
} = require("./controllers/gameController");

const app = express();
app.use(json());
app.use(cors());

//Connect Massive to Heroku
massive(process.env.CONNECTION_STRING)
  .then(dbInst => app.set("db", dbInst))
  .catch(err => console.log(`Error in massive() - ${err}`));

// point server to the build folder
app.use(express.static(`${__dirname}/../build`));

app.get("/api/users", getAllUsers);
// app.get("/api/users", () => console.log('GetAllUsers()'));
app.get("/api/user/:id", getUser);
app.post("/api/user", addUser); // Takes in { uname, pword } on req.body;
app.put("/api/user/:id", editUserInfo); // Takes in { pword, pic } on req.body;

app.get("/api/stats/:id", getUsersGameStats);
app.get("/api/stats", getGameStats);
app.get("/api/stats/leader/:gid", getLeaderboard)
app.post("/api/stats", addGameSessionResults); // Takes in { uid, gid, startTime, score } on req.body;

app.get("/api/games", getGamesList);
// app.get("/api/game", getGAMEDATA);           //placeholder for gameController

app.get("/api/time", getServerTime);
// app.put("/api/user/achieve",  editUserAchievements);
// app.put("/api/user/stats",    editUserScores);
// app.delete("/api/user",       removeUser);
// app.delete("/api/user/stats", removeUserStats);

app.listen(port, () => console.log(`Listening for requests on port ${port}`));
