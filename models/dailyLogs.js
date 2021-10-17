const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
    pin: {
        type: Number,
        required: true,
    },
    download: {
        type: Number,
        required: true,
    },
    upload: {
        type: Number,
        required: true,
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("DailyLog", dailyLogSchema);