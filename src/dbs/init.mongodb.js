"use strict";

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");

const connectString = `mongodb+srv://tbquanganh:tbqa20102001@ecommerceshop.wr4tjny.mongodb.net/?retryWrites=true&w=majority`;

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
			.connect(connectString)
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
