"use strict";

const jwt = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
	try {
		// accessToken
		const accessToken = await jwt.sign(payload, publicKey, {
			expiresIn: "2 days",
		});

		// refreshToken
		const refreshToken = await jwt.sign(payload, publicKey, {
			expiresIn: "7 days",
		});
        
        // 
        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`Error verifying access token`, err)
            } else {
                console.log(`Decode verified access token`, decode)
            }
        })

		return {
			accessToken,
			refreshToken,
		};
	} catch (error) {}
};

module.exports = {
	createTokenPair,
};
