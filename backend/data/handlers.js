const { getAllValidators } = require("./chainQueries");

const getAllValidatorsHandler = (api) => async (req, res) => {
  try {
    const data = await getAllValidators(api);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllValidatorsHandler,
};
