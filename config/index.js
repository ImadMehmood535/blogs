const dotenv = require("dotenv").config();

const PORT = process.env.PORT

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING

module.exports = {
    PORT,
    MONGO_CONNECTION_STRING
}