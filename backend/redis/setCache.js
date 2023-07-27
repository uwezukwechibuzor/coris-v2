const redisClient = require("./redisClient");

const setCache = async (key, value, expirationTime) =>
  await redisClient.set(key, JSON.stringify(value), "EX", expirationTime);

module.exports = setCache;
