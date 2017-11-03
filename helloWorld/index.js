var fetch = require('node-fetch');
var axios = require("axios");

function handleGET(req, res) {
  // Do something with the GET request
  var input = req.query.input;

  var url = "http://google.com/";
  
  axios.get("https://icanhazdadjoke.com/")
    .then(function(res) {
    console.log(res);
  });

  fetch('https://icanhazdadjoke.com/')
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
    });

  var randomNumber = Math.floor((Math.random() * input) + 1);
  res.status(200).json({
    messages: [{ text: "Your random number is: " + randomNumber }]
  });
}

function handlePUT(req, res) {
  // Do something with the PUT request
  res.status(403).send("Forbidden!");
}

function handlePOST(req, res) {
  // Do something with the POST request
  var input = req.body.input;

  var randomNumber = Math.floor((Math.random() * input) + 1);
  res.status(200).json({
    messages: [{ text: "Your random number is: " + String(randomNumber) }]
  });
}

/**
 * Responds to a GET request with "Hello World!". Forbids a PUT request.
 *
 * @example
 * gcloud alpha functions call helloHttp
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloWorld = function helloHttp(req, res) {
  switch (req.method) {
    case "GET":
      handleGET(req, res);
      break;
    case "PUT":
      handlePUT(req, res);
      break;
    case "POST":
      handlePOST(req, res);
      break;
    default:
      res.status(500).send({ error: "Something blew up!" });
      break;
  }
};
