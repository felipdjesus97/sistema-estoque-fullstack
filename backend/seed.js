const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "estoque",
});

const senha = bcrypt.hashSync("123", 10);

db.query(
  "INSERT INTO usuarios (usuario, senha) VALUES (?, ?)",
  ["adm", senha],
  (err) => {
    if (err) console.log(err);
    else console.log("Usuário criado com hash!");
    process.exit();
  }
);