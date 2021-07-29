require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 5670;
const cors = require("cors");
const url = process.env.BASE_URL;
const app = express();
const callRoute = require("./Route/Router");

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected🚀");
  })
  .catch(() => {
    console.log("cannot connect 🚫");
  });

app.get("/", (req, res) => {
  res.send("we are ready to go");
});

app.use(express.json());
app.use("/api", callRoute);
app.use(cors());

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
