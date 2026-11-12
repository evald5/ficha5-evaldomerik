import { useState, useEffect } from "react";
import Card from "./Card.jsx";

const API = "http://localhost:3000/api/cartas";

function App() {
  const [cards, setCards] = useState([]);

  // vai buscar as cartas ao server quando a página abre
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <main>
      <h1>A minha coleção</h1>
      <p>Tenho {cards.length} cartas</p>

      <ul>
        {cards.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            type={card.type}
            attack={card.attack}
            defense={card.defense}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
