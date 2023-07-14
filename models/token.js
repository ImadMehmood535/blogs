const mongoose = require("mongoose")
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({

    token: {
        type: String,
        required: true
    },
    userId: { type: mongoose.SchemaTypes.ObjectId, refer: "users" }

}, {
    timestamps: true
})

module.exports = mongoose.model("RefreshToken", refreshTokenSchema, "tokens")