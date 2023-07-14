const jwt = require("jsonwebtoken")
const { ACCESS_TOKEN_SECERET, REFRESH_TOKEN_SECERET } = require("../config/index")
const RefreshToken = require("../models/token")


class JWTServices {
   static signAccessToken(payload, expiryTime) {
        return jwt.sign(payload, ACCESS_TOKEN_SECERET, {
            expiresIn: expiryTime
        })
    }
    static signRefreshToken(payload, expiryTime) {
        return jwt.sign(payload, REFRESH_TOKEN_SECERET, {
            expiresIn: expiryTime
        })
    }
    static verifyAccessToken(token){
        return jwt.verify(token, ACCESS_TOKEN_SECERET)
    }
    static verifyRefreshToken(token){
        return jwt.verify(token, REFRESH_TOKEN_SECERET)
    }

  static async storeRefreshToken(token, userId){
        try{
            const newToken=new RefreshToken({
                token:token,
                userId:userId
            })

            await newToken.save();
        }
        catch(error){
            console.log(error);

        }
    }
}

module.exports = JWTServices;