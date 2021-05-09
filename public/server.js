const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(__dirname));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
function handleListenLog() {
  console.log("Server Starting...");
}
app.listen(3000, handleListenLog);