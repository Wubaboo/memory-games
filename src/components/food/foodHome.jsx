import { useState } from "react";
import GameSettings from "../gameSettings";
import FoodGame from "./foodGame";
import { artStyles } from "../../utils/characterGen";

import "../../styles/food.css";

export default function FoodHome() {
  const [customerCount, setCustomerCount] = useState(2);
  const [artStyle, setArtStyle] = useState("Default");
  const [artDetails, setArtDetails] = useState(artStyles[0]);
  const [maxFood, setMaxFood] = useState(3);
  const [startGame, setStartGame] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  function handleStartGame() {
    setStartGame(!startGame);
  }

  const settings = [
    {
      type: "instructions",
      name: "Instructions",
      deets: { description: "Remember the customers' orders." },
    },
    {
      type: "slider",
      name: "Number of Customers",
      deets: { value: customerCount, min: 2, max: 8, step: 1 },
      onChange: (e) => setCustomerCount(e.target.value),
    },
    {
      type: "options",
      name: "Art Style",
      deets: {
        value: artStyle,
        options: artStyles,
        selection: artStyle,
      },
      onChange: (e) => {
        const newStyle = artStyles.filter(
          (style) => style.name === e.target.value
        );
        setArtStyle(e.target.value);
        setArtDetails(newStyle[0]);
      },
    },
  ];

  return (
    <div className="food-container">
      <h1 style={{ margin: "1em 0em" }}>Food Orders</h1>
      {!startGame ? (
        <GameSettings
          objs={settings}
          handleStart={handleStartGame}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
        ></GameSettings>
      ) : (
        <FoodGame
          customerCount={customerCount}
          artDetails={artDetails}
          setStartGame={setStartGame}
          showTimer={showTimer}
          maxFood={maxFood}
        ></FoodGame>
      )}
    </div>
  );
}
