const { error } = require("console");
const fs = require("fs");

//Synchronous call
fs.writeFileSync("./test.txt", "Hey Shyam");

fs.writeFile("./test2.txt", "Hey Shyam (Async)", (err) => {
  console.log(err);
});
