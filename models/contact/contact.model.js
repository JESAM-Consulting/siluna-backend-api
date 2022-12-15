const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
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

let contactModel = model("Contact", contactSchema, "Contact");
module.exports = contactModel;
