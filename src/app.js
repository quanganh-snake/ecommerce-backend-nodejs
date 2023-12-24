require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { checkOverload } = require("./helpers/check.connect.js");
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// init db
require("./dbs/init.mongodb.js");
// checkOverload();

// init routes
app.use("/", require("./routes"));

// handle errors

module.exports = app;
