import { useEffect, useState } from "react";
import Timer from "../timer";
import FoodCustomer from "./foodCustomer";
import { foods } from "../../data/foods";
import FoodGuess from "./foodGuess";
import { getAvatar } from "../../utils/characterGen";

export default function FoodGame({
  customerCount,
  artDetails,
  maxFood,
  showTimer,
  setStartGame,
}) {
  const [win, setWin] = useState(undefined);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(0);
  const [customerStates, setCustomerStates] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  function generateOrders(max = maxFood) {
    const itemsCount = 1 + Math.floor(Math.random() * max);
    const res = [];
    for (let i = 0; i < itemsCount; i++) {
      res.push({ ...foods[Math.floor(Math.random() * foods.length)] });
    }
    return res;
  }

  useEffect(() => {
    setCustomers(Array.from({ length: customerCount }, () => Math.random()));
    setOrders(Array.from({ length: customerCount }, () => generateOrders()));
    setCustomerStates(Array.from({ length: customerCount }, () => "neutral"));
  }, []);

  function renderCustomerButton(customer) {
    if (customer < customers.length) {
      return (
        <button
          onClick={() => {
            setCurrentCustomer(customer + 1);
          }}
        >
          {customer === customers.length - 1 ? "Ready" : "Next Customer"}
        </button>
      );
    }
  }
  function getAvatarState(seed, state) {
    if (state === "neutral")
      return getAvatar(artDetails.code, seed, artDetails.neutral);
    else if (state === "happy")
      return getAvatar(artDetails.code, seed, artDetails.happy);
    else if (state === "angry")
      return getAvatar(artDetails.code, seed, artDetails.angry);
  }
  return (
    <div className="food-game">
      {currentCustomer < customers.length ? (
        <FoodCustomer
          seed={customers[currentCustomer]}
          state={customerStates[currentCustomer]}
          artDetails={artDetails}
          order={orders[currentCustomer]}
          getAvatarState={getAvatarState}
        />
      ) : (
        <FoodGuess
          customers={customers}
          orders={orders}
          getAvatarState={getAvatarState}
          customerStates={customerStates}
          setCustomerStates={setCustomerStates}
          setMistakes={setMistakes}
          setWin={setWin}
          maxFood={maxFood}
        ></FoodGuess>
      )}

      {renderCustomerButton(currentCustomer)}
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
