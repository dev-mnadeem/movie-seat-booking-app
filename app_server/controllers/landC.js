// mongoose 7 removed callback support from model methods; these are promises
// now. The old driver (mongoose 5 / mongodb 3.1) also spoke the OP_QUERY
// opcode, which MongoDB 6 removed — every write failed with
// "Unsupported OP_QUERY command: insert" while the pages still rendered, so
// the application looked like it worked and persisted nothing.
var mongoose = require("mongoose");
var Cinema = mongoose.model("Cinema");

module.exports.test = function(req, res) {
  res.render("landing.html", { status: "success" });
};

module.exports.createCinema = function(req, res) {
  Cinema.create(
    {
      id: 1,
      cinema_name: "cineplex",
      location: "model town",
      capacity: 200,
      reserved: 3,
      goldPrice: 940,
      silverPrice: 340,
      rating: 3,
      description: "Best in town",
      movList: [
        {
          movieid: 1,
          title: "the nun",
          genre: "horror",
          language: "english",
          rating1: 2,
          description1: "dsdsdff",
          timeS: [
            {
              time1: new Date(),
              date1: new Date(),
              reservedS: 1
            },
            {
              time1: new Date(),
              date1: new Date(),
              reservedS: 1
            }
          ]
        },
        {
          movieid: 2,
          title: "the moonstone",
          genre: "horror",
          language: "english",
          rating1: 2,
          description1: "dsdsdff",
          timeS: [
            {
              time1: new Date(),
              date1: new Date(),
              reservedS: 1
            },
            {
              time1: new Date(),
              date1: new Date(),
              reservedS: 1
            }
          ]
        }
      ]
    }
  )
    .then((cinema) => {
      res.render("index.html", { cinemaData: cinema });
    })
    .catch((err) => {
      console.error("failed to create cinema:", err.message);
      res.status(500).render("index.html", { cinemaData: null, error: err.message });
    });
};
