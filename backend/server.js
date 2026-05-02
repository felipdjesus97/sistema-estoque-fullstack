// SERVER COMPLETO (PROFISSIONAL + .ENV)

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   ENV
========================= */
const PORT = process.env.PORT || 3001;
const SECRET = process.env.JWT_SECRET;

/* =========================
   MYSQL CONNECTION
========================= */
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("Erro no MySQL:", err);
  } else {
    console.log("MySQL conectado!");
  }
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

/* =========================
   LOGIN
========================= */
app.post("/login", (req, res) => {
  let { usuario, senha } = req.body;

  usuario = usuario.toLowerCase();

  db.query(
    "SELECT * FROM usuarios WHERE LOWER(usuario) = ?",
    [usuario],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0)
        return res.status(401).json({ msg: "Usuário ou senha inválidos" });

      const user = results[0];

      const ok = bcrypt.compareSync(senha, user.senha);

      if (!ok)
        return res.status(401).json({ msg: "Usuário ou senha inválidos" });

      const token = jwt.sign(
        { id: user.id, usuario: user.usuario.toLowerCase() },
        SECRET,
        { expiresIn: "2h" }
      );

      res.json({ token });
    }
  );
});

/* =========================
   AUTH MIDDLEWARE
========================= */
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ msg: "Sem token" });

  const token = header.replace("Bearer ", "");

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Token inválido" });

    req.user = decoded;
    next();
  });
}

/* =========================
   PRODUTOS
========================= */
app.get("/produtos", auth, (req, res) => {
  db.query("SELECT * FROM produtos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/produtos", auth, (req, res) => {
  const { nome, quantidade } = req.body;

  db.query(
    "INSERT INTO produtos (nome, quantidade) VALUES (?, ?)",
    [nome, quantidade],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        id: result.insertId,
        nome,
        quantidade,
      });
    }
  );
});

app.put("/produtos/:id", auth, (req, res) => {
  const { nome, quantidade } = req.body;

  db.query(
    "UPDATE produtos SET nome=?, quantidade=? WHERE id=?",
    [nome, quantidade, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "ok" });
    }
  );
});

app.delete("/produtos/:id", auth, (req, res) => {
  db.query(
    "DELETE FROM produtos WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "ok" });
    }
  );
});