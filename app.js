const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather APP",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  res.render("error", {
    title: "Error",
    error: "Please provide an address!",
  });
});

app.get("/weather/:location", (req, res) => {
  const searchLocation = req.params.location;
  if (!searchLocation) {
    return res.render("error", {
      title: "Error",
      error: "Please provide an address!",
    });
  }
  geocode(searchLocation, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.render("error", { title: "Error", error });
    }
    forecast(latitude, longtitude, (error, forecastData) => {
      if (error) {
        return res.render("error", { title: "Error", error });
      }
      res.render("weather", {
        title: "Search result",
        forecastData,
        location,
      });
    });
  });
});

app.post("/weather", (req, res) => {
  res.redirect(`/weather/${req.body.location}`);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
