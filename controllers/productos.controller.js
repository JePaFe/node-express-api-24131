const db = require("../db/db");

const fs = require("fs");
const path = require("path");

const index = (req, res) => {
  const sql = "SELECT * FROM productos";
  db.query(sql, (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM productos WHERE id = ?";
  db.query(sql, [id], (error, rows) => {
    // console.log(rows);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el producto" });
    }

    res.json(rows[0]);
  });
};

const store = (req, res) => {
  console.log(req.file);

  let imageName = "";

  if (req.file) {
    imageName = req.file.filename;
  }
  const { nombre, precio, stock } = req.body;

  const sql =
    "INSERT INTO productos (nombre, stock, precio, imagen) VALUES (?, ?, ?, ?)";
  db.query(sql, [nombre, stock, precio, imageName], (error, result) => {
    // console.log(result);
    if (error) {
      // console.log(error)
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    const producto = { ...req.body, id: result.insertId };

    res.status(201).json(producto);
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  const sql =
    "UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?";
  db.query(sql, [nombre, precio, stock, id], (error, result) => {
    console.log(result);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: "No existe el producto" });
    }

    const producto = { ...req.body, ...req.params };

    res.json(producto);
  });
};

const destroy = (req, res) => {
  const { id } = req.params;

  let sql = "SELECT * FROM productos WHERE id = ?";
  db.query(sql, [id], (error, rows) => {
    // console.log(rows);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el producto" });
    }

    fs.unlinkSync(path.resolve(__dirname, "../public/uploads", rows[0].imagen));
  });

  sql = "DELETE FROM productos WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    // console.log(result);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: "No existe el producto" });
    }

    res.json({ mensaje: "Producto eliminado" });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
