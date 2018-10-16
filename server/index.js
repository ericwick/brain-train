const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
require("dotenv").config();

const port = process.env.SERVER_PORT || 3001;

const {
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
} = require("./controller");

const { getGAMEDATA } = require("./gameController");

const app = express();
app.use(json());

//Connect Massive to Heroku
massive(process.env.CONNECTION_STRING)
  .then(dbInst => app.set("db", dbInst))
  .catch(err => console.log(`Error in massive() - ${err}`));

// point server to the build folder
app.use(express.static(`${__dirname}/../build`));

app.get("/api/users", getAllUsers);
app.get("/api/user/:id", getUser);
app.get("/api/stats/:id", getUsersGameStats);
app.get("/api/stats", getGameStats);
app.get("/api/games", getGamesList);
// app.get('/api/game',          getGAMEDATA);           //placeholder for gameController
app.post("/api/user", addUser);
// Takes in { uname, pword } on req.body;
// app.post('/api/game',         addGameSessionResults);
// app.put('/api/user',          editUserInfo); //takes in a block of user info. Includes username, password, anon toggle, favorites, etc
// app.put('/api/user/achieve',  editUserAchievements);
// app.put('/api/user/stats',    editUserScores);
// app.delete('/api/user',       removeUser);
// app.delete('/api/user/stats', removeUserStats);

app.listen(port, () => console.log(`Listening for requests on port ${port}`));
