const getGamesList = (req, res, next) => {
  const dbInst = req.app.get("db");
  dbInst
    .get_games_list()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_games_list() - ${err}`));
};

const addNewGame = (req, res, next) => {
  const dbInst = req.app.get("db");
  const { name, cat, desc } = req.body;
  dbInst
    .add_new_game([name, cat, desc])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_new_game() - ${err}`));
};

const getGAMEDATA = (req, res, next) => {};

//---------------------Trivia Game-------------------------------

const getTrivia = (req, res, next) => {
  /*Takes in 
  'category' (string) 
  'num' (integer number of results)
  'difficulty' (integer 1-3. optional) on req.query*/
  // acceptable values: ["Sports", "Mathematics", "Television", "Art", "History",
  //                     "Video Games", "General", "Books", "Mythology", "Animals",
  //                     "Anime & Manga", "Computers", "Celebrities", "Geography", "Board Games",
  //                     "Cartoon", "Musicals", "Gadgets", "Science & Nature", "Politics",
  //                     "Music", "Comics", "Film", "Vehicles"];
  const { category, difficulty, num } = req.query;
  const dbInst = req.app.get("db");
  const query = `SELECT * FROM trivia WHERE category LIKE '%${category}%' ${
    difficulty ? `AND difficulty = ${difficulty} ` : null
    }ORDER BY RANDOM() LIMIT ${num};`;
  dbInst
    .query(query)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_trivia() - ${err}`));
};

module.exports = {
  getGamesList,
  addNewGame,
  getGAMEDATA,
  //--TriviaGame
  getTrivia
};
