const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const FICHEIRO = path.join(__dirname, "cartas.json");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// lê as cartas do ficheiro ao arrancar o server
const cards = JSON.parse(fs.readFileSync(FICHEIRO, "utf8"));

// grava as cartas no ficheiro
function guardar() {
  fs.writeFileSync(FICHEIRO, JSON.stringify(cards, null, 2));
}

// próximo id livre
function proximoId() {
  return Math.max(0, ...cards.map((c) => c.id)) + 1;
}

// para o nome de uma carta não estragar o HTML
function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

app.get("/", (req, res) => {
  res.send(`
    <h1>A minha coleção de cartas</h1>
    <p>Tenho ${cards.length} cartas.</p>
    <p><a href="/cartas">Ver cartas</a></p>
  `);
});

app.get("/cartas", (req, res) => {
  const items = cards.map((card) => `<li>${escapar(card.name)}</li>`).join("");
  res.send(`
    <h1>Cartas</h1>
    <ul>${items}</ul>
  `);
});

app.get("/api/cartas", (req, res) => {
  res.json(cards);
});

app.post("/api/cartas", (req, res) => {
  const { name, type, attack } = req.body || {};
  console.log("POST /api/cartas", req.body);

  const card = {
    id: proximoId(),
    name: String(name).trim(),
    type,
    attack: Number(attack) || 0,
  };
  cards.push(card);
  guardar();
  res.status(201).json(card);
});

app.listen(PORT, () => {
  console.log(`Server a correr em http://localhost:${PORT}`);
});
