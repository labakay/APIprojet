const mongoose = require('mongoose');
const config = require('../configs');
const url = config.database.url;

exports.dbConnect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("succesfully connected to the database")
    }).catch(err => {
        console.log("couldnt connect to the database", err)
        process.exit(-1);
})
}
