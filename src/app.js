const path = require("path");
const express = require("express");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const port = process.env.PORT || 3000
const hbs = require("hbs");
const app = express();
// console.log(__dirname);
// console.log(path.join(__dirname , "../public"));
//defining paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars view engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Team Darth",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Team Darth",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helptext: "some helping text Maybe",
    name: "Team Darth",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "send the correct initials",
    });
  }
  // res.send({
  //   forecast:'it is raining',
  //   location: req.query.address,
  // })
  const address = req.query.address;
  geocode(address, (error, data) => {
    if (error) {
      return res.send({
        error: "send the correct initials",
      });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: "send the correct initials",
        });
      }
      res.send({
        location: data.location,
        forecast: forecastData,
      });
    });
  });
});

//error handling
app.get("/help/*", (req, res) => {
  res.render("error", {
    errorMessage: "Help Article not available",
    title: "OOOPS! Cannot find Query!",
    name: "Go back!",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    errorMessage: "404 error Connection Lost!",
    title: "OOps! 404 Error!",
    name: "Go Back!",
  });
});

app.listen(port, () => {
  console.log("listening to port "+ port);
});
