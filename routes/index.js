const app = require("express")();

const contactRoutes = require("./contact/contact.routes");

app.get("/", (req, res) => {
  res.send("Welcome to Property Management APIs!");
});

app.use("/v1/contact", contactRoutes);


module.exports = app;
