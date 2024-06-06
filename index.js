const express = require("express");
const app = express();

app.use(express.static("public"));

// http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hola Express!");
});

app.get("/nosotros", (req, res) => {
  // login
  res.sendFile(__dirname + "/private/nosotros.html");
});

app.get("/frutas", (req, res) => {
  console.log(req.query);
  res.sendFile(__dirname + "/frutas.json");
});

const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
];

app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
  const user = users.find((user) => user.id == req.params.id);
  console.log(user);
  res.send(user);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
