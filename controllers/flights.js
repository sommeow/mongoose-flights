var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    index,
    newFlights,
    create,
    show,
    addDestination,
    deleteFlight,
    addTicket
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
      res.render('flights/index', { flights });
    });
};

function newFlights(req, res) {
    //respond with a form for entering a new flight
    res.render('flights/new');
};

function create(req, res) {
  var flight = new Flight(req.body);
  flight.save(function(err) {
      // one way to handle errors
      if (err) return res.render('flights/new');
      // for now, redirect right back to new.ejs
      res.redirect('/flights');
  });
};

function show(req, res, next) {
  Flight.findById(req.params.id, function (err, flight) {
    if (err) return res.redirect('/flights');
    Ticket.find({flight: flight._id}, function(err2, tickets) {
      res.render('flights/show', { flight, tickets });
    });
  });
};

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(err, flight){
    if (err) return res.redirect('/flights');
      console.log(flight);
    res.redirect('/flights');
  });
};

function addDestination(req, res, next) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.destinations.push(req.body);
    flight.save();
    console.log(flight);
    res.render('flights/show', { flight });
  });
}



function addTicket(req, res, next) {
  var seat = req.body.seat;
  var price = req.body.price;
  var flight = req.params.id;
  var ticket = new Ticket({seat, price, flight});
  ticket.save(function(err) {
      // one way to handle errors
      if (err) return res.render('flights/new');
      // for now, redirect right back to new.ejs
      res.redirect(`/flights/${req.params.id}`);
  });
};