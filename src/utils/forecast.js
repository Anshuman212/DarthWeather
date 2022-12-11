const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=2f91e63c2405cff1fea416c6561147fa&query='+latitude+','+ longitude+'&units=f';

  request({ url: url, json: true }, (error, response) => {
    // console.log(respose);
    // const data = JSON.parse(respose.body);
    // console.log(data.current);
    if (error) {
      callback("cannot connect to the api", undefined);
    } else if (response.body.error) {
      callback("invalid input", undefined);
    } else {
      callback(undefined, response.body.current.temperature);
    }
  });
};
module.exports = forecast;
