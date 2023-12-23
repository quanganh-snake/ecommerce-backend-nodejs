"use strict";

const mongoose = require("mongoose");
const {
	db: { host, port, dbName, username, password },
} = require("../configs/config.mongodb");
const { countConnect } = require("../helpers/check.connect");

const connectString = `${host}://${username}:${password}${port}${dbName}?retryWrites=true&w=majority`;

class Database {
	constructor() {
		this.connect();
	}

	// connect
	connect(type = "mongodb") {
		// Write logs
		if (1 === 1) {
			mongoose.set("debug", true);
			mongoose.set("debug", { color: true });
		}

		mongoose
			.connect(connectString, {
				maxPoolSize: 100,
			})
			.then(() => {
				console.log(`Connected Mongodb PRO Successfully!`);
				countConnect();
			})
			.catch((err) => {
				console.log(`Error connecting to Mongo!`);
			});
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}

		return Database.instance;
	}
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
