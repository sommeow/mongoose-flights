var mongoose = require('mongoose');

// optional shortcut to the mongoose.Schema class
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    seat: {
        type: String, 
        match: (/[A-F][1-9]\d?/),
    },
    price: {
        type: Number, 
        min: 0,
    },
    flight: {
        type: mongoose.Types.ObjectId, 
        ref: 'Flight',
    },
});


module.exports = mongoose.model('Ticket', ticketSchema);