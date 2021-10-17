const express = require("express");
const app = express();
const router = require('./router');
const mongoose = require("mongoose");
const Benchmark = require("./helper/benchmark");
const path = require('path');
const bodyParser = require("body-parser");

// connect mongoDB database
mongoose.connect("mongodb+srv://speedTest:123%21%40%23@cluster0.h4kmt.mongodb.net/speedTest?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB successfully connected!")).catch(error => {
    console.log(error);
    process.exit(1);
});

// parse request to body-parser
app.use(bodyParser.urlencoded({extended: true}));

// set view engine
app.set('view engine', 'ejs');

// set static path to public folder
app.use('/static', express.static(path.join(__dirname, 'public')))

// main route
app.use('/', router);

// logs testing result in db every hour
const benchmark = new Benchmark();
setInterval(() => benchmark.hourly(), 60 * 60 * 1000);


app.listen(5000, () => {
    console.log("Server is Running on 5000!")
})

// If the connection throws an error
mongoose.connection.on("error", function (err) {
    console.error('Failed to connect to DB  on startup ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection to DB : disconnected');
});

var gracefulExit = function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection with DB : is disconnected through app termination');
        process.exit(0);
    });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
