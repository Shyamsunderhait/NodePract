const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const port = 8000;
const app = express();

//Middleware or plugin

//converts form data into body
app.use(express.urlencoded({ extended: false }));

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
  res.send(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
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
