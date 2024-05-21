const http = require("http");
const fs = require("fs");
const url = require("url");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Home page");
});
app.get("/about", (req, res) => {
  return res.send(`hey ${req.query.name}`);
});

app.listen(5000, () => {
  console.log("listening");
});

// const myHandler = (req, res) => {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `${Date.now()}: ${req.method} ${req.url} New req recieved \n`;
//   const myUrl = url.parse(req.url, true);
//   fs.appendFile("log.txt", log, (err, data) => {
//     console.log(err);
//     switch (myUrl.pathname) {
//       case "/":
//         if (req.method === "GET") res.end("HomePage");
//         break;
//       case "/about":
//         const username = myUrl.query.myName;
//         res.end(`Hey ${username}`);
//         break;
//       case "/search":
//         const search = myUrl.query.search_url;
//         res.end("Your search is: " + search);
//         break;
//       case "/signup":
//         if (req.method === "GET") res.end("this is sign up form");
//         else if (req.method === "POST") {
//           res.end("this is post request");
//         }
//         break;
//       default:
//         res.end("not found");
//     }
//   });
// };
// const myServer = http.createServer(app);

// myServer.listen(5000, () => {
//   console.log(`listening to port 5000`);
// });
