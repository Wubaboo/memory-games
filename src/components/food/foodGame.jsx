import { useEffect, useState } from "react";
import Timer from "../timer";
import FoodCustomer from "./foodCustomer";
import { foods } from "../../data/foods";
import FoodGuess from "./foodGuess";
import FoodResult from "./foodResult";
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
      {win === undefined &&
        (currentCustomer < customers.length ? (
          <>
            <FoodCustomer
              seed={customers[currentCustomer]}
              state={customerStates[currentCustomer]}
              artDetails={artDetails}
              order={orders[currentCustomer]}
              getAvatarState={getAvatarState}
              renderCustomerButton={renderCustomerButton}
              currentCustomer={currentCustomer}
            />
          </>
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
        ))}

      <div className="food-info">
        <Timer paused={win !== undefined} visible={showTimer}></Timer>
      </div>
      {win === undefined ? null : (
        <FoodResult
          customers={customers}
          customerStates={customerStates}
          orders={orders}
          mistakes={mistakes}
          getAvatarState={getAvatarState}
          setStartGame={setStartGame}
          setWin={setWin}
          setCurrentCustomer={setCurrentCustomer}
        ></FoodResult>
      )}
    </div>
  );
}
