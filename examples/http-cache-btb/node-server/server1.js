const http = require("http");

const server = http.createServer((req, res) => {
  http.get("http://0.0.0.0:5001", (response) => {
    let responseData = "";
    response.on("data", (data) => {
      responseData += data;
    });
    response.on("end", () => {
      res.writeHead(200);
      res.write(responseData);
    });
  });
});

server.listen(5000);
