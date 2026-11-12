const express = require("express");

const app = express();
const PORT = 3000;

// CORS à mão (aula 5)
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
});

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

app.get("/", (req, res) => {
  res.send(`
    <h1>A minha coleção de cartas</h1>
    <p>Tenho ${cards.length} cartas.</p>
    <p><a href="/cartas">Ver cartas</a></p>
  `);
});

app.get("/cartas", (req, res) => {
  const items = cards.map((card) => `<li>${card.name}</li>`).join("");
  res.send(`
    <h1>Cartas</h1>
    <ul>${items}</ul>
  `);
});

app.get("/api/cartas", (req, res) => {
  res.json(cards);
});

app.listen(PORT, () => {
  console.log(`Server a correr em http://localhost:${PORT}`);
});
