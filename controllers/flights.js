var Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlights,
    create,
    show,
    delete: deleteFlight
};

function deleteFlight (req, res) {
    Flight.deleteOne (req.params.id);
    res.redirect('/flights');
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
  }

  function show(req, res) {
      Flight.findById(req.params.id, function (err, flight) {
          if (err) return res.redirect('/');
          res.render('flights/show', { flight });
      });
    };

    function addDestination(req, res, next) {
  }