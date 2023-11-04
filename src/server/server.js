require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const weatherbit = require("@datafire/weatherbit").create();
const pixabay = require("pixabay-api");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

// init middlewares ----------------------------------------------------------------------------------------------------
// DEV env
app.use(morgan("dev"));
// PROD env
// app.use(morgan("combined"))
// Protect metadata header information including tech stacks, ...
app.use(helmet());
// Optimize the response capacity
app.use(compression());

// init routes ---------------------------------------------------------------------------------------------------------
app.post("/city-info", (req, res, next) => {
  geocoder
    .get("search", {
      q: req.body.to,
      maxRows: 10,
    })
    .then(function (response) {
      const cityInfo = response.geonames[0];
      console.log(cityInfo);
      res.send(cityInfo);
    })
    .catch(function (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error retrieving the info of the city" });
    });
});

app.post("/weather", (req, res, next) => {
  weatherbit.forecast.daily_city_city_country_country
    .get({
      city: req.body.name,
      country: req.body.countryCode,
      key: process.env.WEATHERBIT_API_KEY,
    })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch(function (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error retrieving the weather of the city" });
    });
});

app.post("/city-photo", (req, res, next) => {
  pixabay
    .searchImages(process.env.PIXABAY_API_KEY, req.body.name + "+city", {
      image_type: "photo",
    })
    .then((result) => {
      console.log(result.hits[0].webformatURL);
      res.send({ url: result.hits[0].webformatURL });
    })
    .catch(function (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error retrieving the photo of the city" });
    });
});

const GeocoderGeonames = require("geocoder-geonames"),
  geocoder = new GeocoderGeonames({
    username: process.env.GEONAMES_USERNAME,
  });

const PORT = process.env.PORT || 3056;

app.listen(PORT, () => {
  console.log(`FEND capstone project starts with port: ${PORT}`);
});

export default app;
