require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.static("public"));

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const productosRouter = require("./routes/productos.router");
// app.use('/productos', productosRouter);

app.use("/productos", require("./routes/productos.router"));
app.use("/auth", require("./routes/auth.router"));

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
