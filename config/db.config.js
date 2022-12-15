const mongoose = require('mongoose');
const debugDb = require('debug')('db')

mongoose.connect(process.env.MONGO_URI).then(() => {
    debugDb("🌊🌊 Siluna-backend-connected")
}).catch(err => {
    debugDb(err);
})