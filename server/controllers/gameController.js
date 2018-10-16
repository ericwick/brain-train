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

module.exports = {
  getGamesList,
  addNewGame,
  getGAMEDATA
};
