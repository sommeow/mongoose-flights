var Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {airline: 'All Flights', flights});
    });
}

function newFlight(req, res) {
    res.render('flights/new', { title: 'Add Flight' });
}