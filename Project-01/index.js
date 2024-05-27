const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const port = 8000;
const app = express();

//Middleware or plugin

//converts form data into body
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

app.use((req, res, next) => {
  next();
  // return res.json({ res: "Middle ware ended here" });
});

//rooutes

app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

// using app routes for common route

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const userById = users.find((user) => user.id === id);
    if (!userById) {
      return res.status(404).json({ status: "Not found" });
    }
    return res.json(userById);
  })
  .patch((req, res) => {
    //edit user with id
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  });

app.get("/api/users", (req, res) => {
  console.log(req.headers);
  res.setHeader("X-myName", "Shyamsunder Hait");
  res.send(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ status: "bad request" });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(203).json({ status: "success", id: users.length });
  });
});

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const userById = users.find((user) => user.id === id);
//   res.json(userById);
// });

app.listen(port, () => {
  console.log("listenning....");
});
