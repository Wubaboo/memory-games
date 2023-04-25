import { useEffect, useState } from "react";
import {
  useWindowDimensions,
  MOBILE_WIDTH,
} from "../../utils/useWindowDimensions";

export default function MinefieldGame({ decksCount, setStartGame }) {
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(undefined);
  const [seen, setSeen] = useState(new Set());
  const [unseen, setUnseen] = useState(new Set());
  const [allItems, setAllItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const items = [];
    const suits = "SHDC";
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    for (let s of suits) {
      for (let val of values) {
        items.push(val + s);
      }
    }
    setUnseen(new Set(items));
    setAllItems(items);
    setCurrentItem(items[0]);
  }, []);

  function getCardPath(card) {
    return process.env.PUBLIC_URL + `/assets/cards/${card}.svg`;
  }

  function moveToSeen(item) {
    const newUnseen = new Set(unseen);
    const newSeen = new Set(seen);
    newUnseen.delete(item);
    newSeen.add(item);
    setSeen(newSeen);
    setUnseen(newUnseen);
  }

  function getRandomItem() {
    return allItems[Math.floor(Math.random() * allItems.length)];
  }
  function handleClickedSeen() {
    if (seen.has(currentItem)) console.log("has", currentItem);
    else console.log("have not seen", currentItem);
    setCurrentItem(getRandomItem());
  }

  function handleClickedNotSeen() {
    if (seen.has(currentItem)) console.log(currentItem, "has been seen");
    else {
      console.log(currentItem, " has not been seen");
      moveToSeen(currentItem);
    }
    setCurrentItem(getRandomItem());
  }
  return (
    <>
      <div className="sets">
        <div className="sets-object">
          <img className="card" src={getCardPath(currentItem)} />
        </div>
      </div>
      <div className="sets-seen-buttons">
        <button onClick={handleClickedSeen}>Seen</button>
        <button onClick={handleClickedNotSeen}>Not Seen</button>
      </div>
      <div className="sets-info">
        {win === true ? (
          <h2>Nice job!</h2>
        ) : win === false ? (
          <h2>Good try</h2>
        ) : null}
      </div>
      <p>Seen: {seen.size}</p>
      <p>Unseen: {unseen.size}</p>
      {win === undefined ? null : (
        <button
          onClick={() => {
            setStartGame(false);
          }}
        >
          New Game
        </button>
      )}
    </>
  );
}
