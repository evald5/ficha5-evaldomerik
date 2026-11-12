import { useState, useEffect } from "react";
import Card from "./Card.jsx";

const API = "http://localhost:3000/api/cartas";

function App() {
  const [cards, setCards] = useState([]);

  // campos do formulário
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [attack, setAttack] = useState("");
  const [formError, setFormError] = useState("");

  // vai buscar as cartas ao server quando a página abre
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault(); // não deixa a página recarregar
    setFormError("");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, attack: Number(attack) || 0 }),
      });
      if (!res.ok) {
        // por exemplo "HTTP 400"
        setFormError("HTTP " + res.status);
        return;
      }
      // a carta que entra na lista é a que o server devolveu
      const card = await res.json();
      setCards([...cards, card]);
      // limpa o form
      setName("");
      setType("");
      setAttack("");
    } catch {
      setFormError("Não foi possível ligar ao server");
    }
  }

  async function handleDelete(id) {
    const res = await fetch(API + "/" + id, { method: "DELETE" });
    if (res.ok) {
      setCards(cards.filter((card) => card.id !== id));
    }
  }

  return (
    <main>
      <h1>A minha coleção</h1>
      <p>Tenho {cards.length} cartas</p>

      <form onSubmit={handleSubmit}>
        <h2>Nova carta</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Escolhe o tipo</option>
          <option value="Criatura">Criatura</option>
          <option value="Feitiço">Feitiço</option>
          <option value="Estrutura">Estrutura</option>
        </select>
        <input
          type="number"
          placeholder="Ataque"
          value={attack}
          onChange={(e) => setAttack(e.target.value)}
        />
        <button type="submit">Acrescentar</button>
      </form>
      {formError && <p style={{ color: "red" }}>{formError}</p>}

      <ul>
        {cards.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            type={card.type}
            attack={card.attack}
            defense={card.defense}
            onDelete={() => handleDelete(card.id)}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
