const express = require("express");
const router = express.Router();

const {
  createContact,
  getContact,
  deleteContact
} = require("../../controllers/contact/contact.controller");

router.post("/create-contact", createContact);
router.get("/get-contact", getContact);
router.delete("/delete-contact", deleteContact);

module.exports = router;
