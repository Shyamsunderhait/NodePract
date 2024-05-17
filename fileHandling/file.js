const { error } = require("console");
const fs = require("fs");

//Synchronous call
fs.writeFileSync("./test.txt", "Hey Shyam");

//Asynchrono us
fs.writeFile("./test2.txt", "Hey Shyam (Async)", (err) => {
  console.log(err);
});

//Synchronous call
//always returns something
const result = fs.readFileSync("./read.txt", "utf-8");
console.log(result);

//Asynchronous
//doesnt return and expects a callback
fs.readFile("./read.txt", "utf-8", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

fs.appendFileSync(
  "./test.txt",
  `\n Date: ` + new Date().getDate().toLocaleString()
);
//copy
fs.cpSync("./read.txt", "./copyRead.txt");
//delete
fs.unlinkSync("./copyRead.txt");

//make directory

fs.mkdirSync("./myDirectory/a/b/c", { recursive: true });
