// Componente Card: recebe name, type, attack e defense como props
function Card({ name, type, attack, defense, onDelete }) {
  return (
    <li>
      {name} ({type}, ataque {attack}
      {defense !== undefined && `, defesa ${defense}`})
      {onDelete && <button onClick={onDelete}>Apagar</button>}
    </li>
  );
}

export default Card;
