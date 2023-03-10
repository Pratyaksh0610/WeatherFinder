const exp = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = exp();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log("Post received");

  const query = req.body.cityName;
  const apiKey = "9a50d34805bf72670abff94a1fb7c104";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherDescription = weatherData.weather[0].description;
      res.write(
        "<h1>The temp in " + query + " is " + temp + " degree Celsius.</h1>"
      );
      res.write(
        "<p>The weatherDescription of " +
          query +
          " is " +
          weatherDescription +
          "</p>"
      );
      res.write("<img src=" + iconURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server has started");
});
