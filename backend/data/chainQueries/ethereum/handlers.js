const { getAllTxs } = require("../../dbQueries");

const ethereumTxsHandler = (txModel) => async (req, res) => {
  try {
    const data = await getAllTxs(req, res, txModel);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = ethereumTxsHandler;
