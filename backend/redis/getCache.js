const redisClient = require("./redisClient");

const getCache = async (key) => JSON.parse(await redisClient.get(key));

module.exports = getCache;
