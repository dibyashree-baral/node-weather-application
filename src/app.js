const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 4000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    heading: "Weather application",
    footerText: "Created by Dibyashree"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    heading: "About",
    footerText: "Created by Dibyashree"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    heading: "Help",
    footerText: "Created by Dibyashree"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }
  geocode(req.query.address, (err, response) => {
    err
      ? res.send({ error: err })
      : forecast(
          response.longitude,
          response.latitude,
          (forecastErr, forecastResponse) => {
            forecastErr
              ? res.send({ error: forecastErr })
              : res.send({ ...forecastResponse, address: req.query.address });
          }
        );
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    heading: "404!!",
    errorMessage: "help page not found!"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    heading: "Sorry!!",
    errorMessage: "Page not found!"
  });
});

app.listen(port, () => {
  console.log(`Server is up now at ${port}`);
});
