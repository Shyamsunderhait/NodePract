const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} New req recieved \n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    console.log(err);
    switch (myUrl.pathname) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        const username = myUrl.query.myName;
        res.end(`Hey ${username}`);
        break;
      case "/search":
        const search = myUrl.query.search_url;
        res.end("Your search is: " + search);
        break;
      default:
        res.end("not found");
    }
  });
});

myServer.listen(5000, () => {
  console.log(`listening to port 5000`);
});
