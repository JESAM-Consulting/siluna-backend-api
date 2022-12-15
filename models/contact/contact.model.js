const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        fname: { type: String, },
        lname: { type: String, },
        email: { type: String, },
        postalCode: { type: Number, },
        phone: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

let userModel = model("admin", userSchema, "admin");
module.exports = userModel;
