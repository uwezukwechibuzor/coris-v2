const express = require("express");
const mongoose = require("mongoose");

const umeeRouter = require("./Routes/Chains/mainnet/umee/routes");
const cosmosRouter = require("./Routes/Chains/mainnet/cosmos/routes");
const agoricRouter = require("./Routes/Chains/mainnet/agoric/routes");
const akashRouter = require("./Routes/Chains/mainnet/akash/routes");
const chihuahuaRouter = require("./Routes/Chains/mainnet/chihuahua/routes");
const crescentRouter = require("./Routes/Chains/mainnet/crescent/routes");
const junoRouter = require("./Routes/Chains/mainnet/juno/routes");
const stargazeRouter = require("./Routes/Chains/mainnet/stargaze/routes");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(umeeRouter);
app.use(cosmosRouter);
app.use(agoricRouter);
app.use(akashRouter);
app.use(chihuahuaRouter);
app.use(crescentRouter);
app.use(junoRouter);
app.use(stargazeRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
