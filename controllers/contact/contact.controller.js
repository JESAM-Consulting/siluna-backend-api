const message = require("../../json/message.json");
const contactModel = require("../../models/contact/contact.model");
const apiRes = require("../../utils/apiResponse");
const { validateEmptyFields, generateToken, hashString } = require("../../utils/utils");

module.exports = {
    createContact: async (req, res) => {
        try {

            let validateMsg = validateEmptyFields(req.body, ["fname", "lname", "email", "postalCode", "phone"]);
            if (validateMsg) {
                return apiRes.BAD_REQUEST(res, validateMsg);
            }

            let contactData = await new contactModel(req.body).save()
            return apiRes.OK(res, message.DATA_CREATED, contactData);

        } catch (error) {
            console.log("🚀 ~ file: contact.controller.js:17 ~ createContact: ~ error", error)
            switch (error.code) {
                case 11000:
                    return apiRes.DUPLICATE_VALUE(res, message.ERROR);

                default:
                    return apiRes.CATCH_ERROR(res, error.message);
            }
        }
    },

    getContact: async (req, res) => {
        try {
            let { _id, search } = req.query

            // pagination
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10

            let criteria = {}
            if (_id) criteria._id = ObjectId(_id)
            if (search) criteria = {
                $or: [
                    { fname: { $regex: search, $options: "i" } },
                    { lname: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { phone: { $regex: search, $options: "i" } },
                ]
            }

            const appraisalCount = await contactModel.find(criteria).countDocuments()
            const getContact = await contactModel.find(criteria)
                .sort({ createdAt: -1 })
                .skip(limit * page - limit)
                .limit(limit)

            if (getContact.length) {
                return apiRes.OK(res, message.DATA_FETCHED, { getContact, count: appraisalCount });
            } else {
                return apiRes.OK(res, message.DATA_NOT_FOUND);
            }

        } catch (error) {
            console.log("🚀 ~ file: contact.controller.js:62 ~ getContact: ~ error", error)
            switch (error.code) {
                case 11000:
                    return apiRes.DUPLICATE_VALUE(res, message.ERROR);

                default:
                    return apiRes.CATCH_ERROR(res, error.message);
            }
        }
    },

    deleteContact: async (req, res) => {
        try {

            let { id } = req.query

            let deleteData = await contactModel.findOneAndDelete({ _id: id })
            if (deleteData) {
                return apiRes.OK(res, message.DATA_DELETED, {});
            } else {
                return apiRes.BAD_REQUEST(res, message.DATA_NOT_FOUND);
            }


        } catch (error) {
            console.log("🚀 ~ file: diamond.controller.js:132 ~ deleteContact: ~ error", error)
            switch (error.code) {
                case 11000:
                    return apiRes.DUPLICATE_VALUE(res, message.ERROR);

                default:
                    return apiRes.CATCH_ERROR(res, error.message);
            }
        }
    },

}
