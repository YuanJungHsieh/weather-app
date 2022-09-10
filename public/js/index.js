console.log("client's side server is running");

fetch("http://localhost:5000/weather?address=Taipei").then((response) => {
  response.json((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
});
