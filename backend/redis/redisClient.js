const Redis = require("redis");

let redisClient;

(async () => {
  redisClient = Redis.createClient();

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  await redisClient.connect();
})();

module.exports = redisClient;
