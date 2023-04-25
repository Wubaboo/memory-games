import "../styles/memoryGameCard.css";
import { Link } from "react-router-dom";

export default function Card({ label, imagePath, caption, alt, path }) {
  return (
    <Link className="memory-game-card" to={path}>
      <h2 className="card-header">{label}</h2>
      <img className="card-image" src={imagePath} alt={alt}></img>
      <p className="card-caption">{caption}</p>
    </Link>
  );
}
