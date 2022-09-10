const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2bc02a9010ceb5ba6f52a55302c7915d&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} (UV index: ${body.current.uv_index}/10). It is currently ${body.current.temperature} Celsius degrees.`
      );
    }
  });
};

module.exports = forecast;
