"use strict";

const shopModel = require("../models/shop.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const salt = 10;

const RoleShop = {
	SHOP: "0001",
	WRITER: "0002",
	EDITOR: "0003",
	ADMIN: "0000",
};

class AccessService {
	static signUp = async ({ name, email, password }) => {
		try {
			// step 1: check email exists?
			const hodelShop = await shopModel.findOne({ email }).lean();

			if (hodelShop) {
				return {
					code: "xxxx",
					message: "Email signup shop already exists!",
				};
			}

			const hashPassword = await bcrypt.hash(password, salt);

			const newShop = await shopModel.create({
				name,
				email,
				password: hashPassword,
				roles: [RoleShop.SHOP],
			});

			if (newShop) {
				/**
				 * created privateKey, publicKey
				 * privateKey: sign Token
				 * publicKey: verify Token
				 */

                // version pro
				// const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
				// 	modulusLength: 4096,
				// 	publicKeyEncoding: {
				// 		type: "pkcs1",
				// 		format: "pem",
				// 	},
				// 	privateKeyEncoding: {
				// 		type: "pkcs1",
				// 		format: "pem",
				// 	},
                // });
                
                // version simple
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString("hex");

				// Public key CryptoGraphy Standard!

				// save collection Keystore
				console.log({
					privateKey,
					publicKey,
				});

				const keyStore = await KeyTokenService.createKeyToken({
					userId: newShop._id,
					publicKey,
					privateKey,
				});

				if (!keyStore) {
					return {
						code: "xxxx",
						message: "keyStore error!",
					};
				}

				// const publicKeyObject = crypto.createPublicKey(publicKeyString);
				// created token pair
				const tokens = await createTokenPair(
					{
						userId: newShop._id,
						email,
					},
					publicKey,
					privateKey
				);
				console.log(`Created token pair: `, tokens);

				return {
					code: 201,
					metadata: {
						shop: getInfoData({ fields: ["_id", "name", "email"], object: newShop }),
						tokens,
					},
				};
			}

			return {
				code: 200,
				metadata: null,
			};
		} catch (error) {
			return {
				code: "xxx",
				message: error.message,
				status: "error",
			};
		}
	};
}

module.exports = AccessService;
