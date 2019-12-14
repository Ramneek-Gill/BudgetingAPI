const express = require("express");
const cors = require("cors");
const app = express();
const winston = require("winston");
require("./startup/logging")();
app.use(cors());
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
