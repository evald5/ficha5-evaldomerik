const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const cards = [
  {
    "id": 1,
    "name": "Dragão de Cobalto",
    "type": "Criatura",
    "attack": 7,
    "defense": 5
  },
  {
    "id": 2,
    "name": "Guardiã das Marés",
    "type": "Criatura",
    "attack": 4,
    "defense": 8
  },
  {
    "id": 3,
    "name": "Raio Carmesim",
    "type": "Feitiço",
    "attack": 6,
    "defense": 0
  },
  {
    "id": 4,
    "name": "Muralha de Granito",
    "type": "Estrutura",
    "attack": 0,
    "defense": 10
  },
  {
    "id": 5,
    "name": "Lobo das Cinzas",
    "type": "Criatura",
    "attack": 5,
    "defense": 3
  }
];

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
  res.status(201).json(card);
});

app.listen(PORT, () => {
  console.log(`Server a correr em http://localhost:${PORT}`);
});
