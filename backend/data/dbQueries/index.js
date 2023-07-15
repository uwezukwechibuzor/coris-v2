async function getLatestBlocks(req, res, blockModel) {
  try {
    const limit = req.query.limit;
    const blocks = await blockModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit)
      .lean();
    return blocks;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllTxs(req, res, txModel) {
  try {
    const limit = req.query.limit;
    const txs = await txModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit)
      .lean();
    return txs;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getLatestBlocks,
  getAllTxs,
};
