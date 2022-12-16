const express = require("express");
const router = express.Router();

const {
  createContact,
  getContact,
  deleteProperty
} = require("../../controllers/contact/contact.controller");

router.post("/create-contact", createContact);
router.get("/get-contact", getContact);
router.delete("/delete-contact", deleteProperty);

module.exports = router;
