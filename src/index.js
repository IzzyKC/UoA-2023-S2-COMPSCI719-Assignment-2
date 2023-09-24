const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// Setup Handlebars
const handlebars = require("express-handlebars").engine;
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// CORS
app.use(cors());

// Parse JSON data in the request body
app.use(express.json());

// Setup static routing. Any file located in the "public" folder
// will be able to be accessed by clients directly.
const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));

// Routes
const routes = require("./routes/routes.js");
app.use("/", routes);

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function () {
  console.log(`CS719 Assignment Two listening on port ${port}!`);
});
