const express = require("express");
const mongoose = require("mongoose");

const cosmosRouter = require("./Routes/Chains/cosmos/mainnet/routes");

const bitcoinRouter = require("./Routes/Chains/bitcoin/routes");

require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set strictQuery to true
mongoose.set("strictQuery", true);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(cosmosRouter);
app.use(bitcoinRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
