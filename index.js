const express = require("express");
// const cors = require("cors");
const app = express();
const winston = require("winston");
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://pacific-reef-90107.herokuapp.com"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
require("./startup/logging")();
// app.use(cors());
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));