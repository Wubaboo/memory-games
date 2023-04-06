import Card from "./card";
import CARDS from "../data/gameCards";
import "../styles/home.css";

export default function Home(props) {
  return (
    <div className="home">
      <div className="cards">
        {CARDS.map((card, i) => (
          <Card
            key={i}
            label={card.label}
            imagePath={card.imagePath}
            caption={card.caption}
            alt={card.alt}
            path={card.path}
          ></Card>
        ))}
      </div>
    </div>
  );
}
