require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// init middlewares ----------------------------------------------------------------------------------------------------
// DEV env
app.use(morgan("dev"));
// PROD env
// app.use(morgan("combined"))
// Protect metadata header information including tech stacks, ...
app.use(helmet());
// Optimize the response capacity
app.use(compression());

// init routes ---------------------------------------------------------------------------------------------------------
app.use("/", require("./routes"));

// handling error

const PORT = process.env.PORT || 3056;

const server = app.listen(PORT, () => {
  console.log(`FEND capstone project starts with port: ${PORT}`);
});

// SIGINT => on type Ctrl + C in IDE
process.on("SIGINT", () => {
  server.close(() => console.log("Exit server express"));
});
