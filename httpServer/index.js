const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New req recieved \n`;
  fs.appendFile("log.txt", log, (err, data) => {
    console.log(err);
    switch (req.url) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        res.end("I am Shyam");
        break;
      default:
        res.end("not found");
    }
  });
});

myServer.listen(5000, () => {
  console.log(`listening to port 5000`);
});
