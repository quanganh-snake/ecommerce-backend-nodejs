"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5000;

// Count the number of connections
const countConnect = () => {
	const numConnections = mongoose.connections.length;
	console.log(`Number of connections: ${numConnections}`);
};

// check overload connect
const checkOverload = () => {
	setInterval(() => {
		// Monitor every 5 seconds
		const numConnections = mongoose.connections.length;
		// check number cores of computer server
		const numCores = os.cpus().length;
		// check memory usage of computer server
		const memoryUsage = process.memoryUsage().rss;

		// Example maximum number of connections based on number of cores
		const maxConnections = numCores * 5;

		console.log(`>>> Active connections: ${numConnections}`);
		console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

		if (numConnections > maxConnections) {
			console.log(`*** Connection OVERLOAD DETECTED!`);
		}
	}, _SECONDS);
};

module.exports = {
	countConnect,
    checkOverload
};
