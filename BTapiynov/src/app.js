require('dotenv/config');
const app = require("./services/server.service")
const mongooseService = require('./services/mongoose.service');

mongooseService.dbConnect();
app.start();


