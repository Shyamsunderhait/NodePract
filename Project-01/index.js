const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const port = 8000;
const app = express();

//Connection

mongoose
  .connect("mongodb://127.0.0.1:27017/Project-01")
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log("Mongo err ", err));

//Schema

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    jobTitle: { type: String },
    gender: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//Model

const User = mongoose.model("users", userSchema);

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

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
  ${allDbUsers
    .map((users) => `<li>${users.firstName} - ${users.email}</li>`)
    .join("")}
  </ul>
  `;
  res.send(html);
});

// using app routes for common route

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: "Not found" });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    //edit user with id
    const userUpdate = await User.findByIdAndUpdate(req.params.id, {
      lastName: "Updated",
    });

    return res.json({ status: "Updated" });
  })
  .delete(async (req, res) => {
    const userToDelete = await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Successfully Deleted" });
  });

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});

  console.log(req.headers);
  res.setHeader("X-myName", "Shyamsunder Hait");
  res.json(allDbUsers);
});

app.post("/api/users", async (req, res) => {
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

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("result ", result);
  return res.status(201).json({ msg: "sucess" });
});

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const userById = users.find((user) => user.id === id);
//   res.json(userById);
// });

app.listen(port, () => {
  console.log("listenning....");
});
