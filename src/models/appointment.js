const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    time: {
        type: String,
        enum: ['09-11 am', '11-03 pm', '03-06 pm', '06-09 pm'],
        required: true
    },
    messages: {
        type: String,
        required: true
    }
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
