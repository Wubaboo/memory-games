import { useEffect, useState } from "react";
import Timer from "../timer";
import FoodCustomer from "./foodCustomer";
export default function FoodGame({
  customerCount,
  artDetails,
  showTimer,
  setStartGame,
}) {
  const [win, setWin] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    setCustomers(Array.from({ length: customerCount }, () => Math.random()));
  }, []);

  return (
    <div className="food-game">
      {customers.map((val, i) => (
        <FoodCustomer
          key={i}
          seed={val}
          state="neutral"
          artDetails={artDetails}
        />
      ))}

      <div className="food-info">
        <Timer paused={win !== undefined} visible={showTimer}></Timer>
        {win === true ? (
          <h2>Nice job!</h2>
        ) : win === false ? (
          <h2>Good try</h2>
        ) : null}
      </div>
      {win === undefined ? null : (
        <button
          onClick={() => {
            setStartGame(false);
          }}
        >
          New Game
        </button>
      )}
    </div>
  );
}
