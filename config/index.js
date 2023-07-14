const dotenv = require("dotenv").config();

const PORT = process.env.PORT

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING
const ACCESS_TOKEN_SECERET = process.env.ACCESS_TOKEN_SECERET
const REFRESH_TOKEN_SECERET = process.env.REFRESH_TOKEN_SECERET
module.exports = {
    PORT,
    MONGO_CONNECTION_STRING,
    REFRESH_TOKEN_SECERET,
    ACCESS_TOKEN_SECERET

}