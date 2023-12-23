"use strict";

const mongoose = require("mongoose");

const connectString = `mongodb+srv://tbquanganh:tbqa20102001@ecommerceshop.wr4tjny.mongodb.net/?retryWrites=true&w=majority`;

mongoose
	.connect(connectString)
	.then(() => {
		console.log(`Connected Mongodb Successfully!`);
	})
	.catch((err) => {
		console.log(`Error connecting to Mongo!`);
	});

    module.exports = mongoose