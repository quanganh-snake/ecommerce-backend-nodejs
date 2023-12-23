"use strict";

const dev = {
	app: {
		port: process.env.DEV_APP_PORT || 3055,
	},
	db: {
		host: process.env.DEV_DB_HOST || "mongodb+srv",
		port: process.env.DEV_DB_PORT || "@servernodejsbackend.oxjq4aq.mongodb.net/",
		dbName: process.env.DEV_DB_DBNAME || "shopDEV",
		username: process.env.DEV_DB_USERNAME || "tbquanganh",
		password: process.env.DEV_DB_PASSWORD || "tbqa20102001",
	},
};

const pro = {
	app: {
		port: process.env.PRO_APP_PORT | 3056,
	},
	db: {
		host: process.env.PRO_DB_HOST || "mongodb+srv",
		port: process.env.PRO_DB_PORT || "@servernodejsbackend.oxjq4aq.mongodb.net/",
		dbName: process.env.PRO_DB_DBNAME || "shopPRO",
		username: process.env.PRO_DB_USERNAME || "tbquanganh",
		password: process.env.PRO_DB_PASSWORD || "tbqa20102001",
	},
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
