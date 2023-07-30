const Redis = require("redis");

let redisClient;

const redis_host = process.env.REDIS_HOST || "localhost";
const redis_port = process.env.REDIS_PORT || 6379;

(async () => {
  redisClient = Redis.createClient({
    socket: {
      host: redis_host,
      port: redis_port,
    },
  });

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  await redisClient.connect();
})();

module.exports = redisClient;
