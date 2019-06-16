const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

const router = require("./routes");

app.use(bodyParser.json());

app.use("/api", router);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Node is listening at http://localhost:${port}`);
});
