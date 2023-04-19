import { shuffleArray } from "../../utils/gridUtils";
import { useEffect, useState } from "react";
import { foods } from "../../data/foods";
import "../../styles/food.css";
export default function FoodGuess({
  customers,
  orders,
  customerStates,
  setCustomerStates,
  setMistakes,
  getAvatarState,
  maxFood,
  setWin,
}) {
  const [customerLineup, setCustomerLineup] = useState(
    shuffleArray([...Array(customers.length).keys()])
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(0);
  const [showOrder, setShowOrder] = useState(false);
  const [wait, setWait] = useState(false);

  function handleAddItem(item) {
    if (selectedItems.length < maxFood)
      setSelectedItems((prev) => [...prev, item]);
  }
  function handleRemoveItem(i) {
    let newItems = [...selectedItems];
    newItems.splice(i, 1);
    setSelectedItems(newItems);
  }

  function makeHappy() {
    setCustomerStates((prev) => {
      const ret = [...prev];
      ret[customerLineup[currentCustomer]] = "happy";
      return ret;
    });
  }
  function makeAngry() {
    setCustomerStates((prev) => {
      const ret = [...prev];
      ret[customerLineup[currentCustomer]] = "angry";
      setShowOrder(true);
      return ret;
    });
  }
  function handleSubmit() {
    if (selectedItems.length === 0 || wait) return;

    let bad = false;
    const counter = {};
    for (let item of orders[customerLineup[currentCustomer]]) {
      if (!counter.hasOwnProperty(item.name)) counter[item.name] = 1;
      else counter[item.name] += 1;
    }
    for (let item of selectedItems) {
      if (!counter.hasOwnProperty(item.name)) {
        makeAngry();
        bad = true;
        break;
      } else {
        counter[item.name] -= 1;
        if (counter[item.name] < 0) {
          makeAngry();
          bad = true;
          break;
        }
      }
    }
    for (let key of Object.keys(counter)) {
      if (counter[key] !== 0) {
        bad = true;
        break;
      }
    }
    if (!bad) makeHappy();
    else {
      makeAngry();
      setMistakes((prev) => prev + 1);
    }
    async function sleep(time) {
      await new Promise((r) => setTimeout(r, time));
      setCurrentCustomer((prev) => prev + 1);
      setSelectedItems([]);
      setShowOrder(false);
      setWait(false);
    }
    setWait(true);
    sleep(1500);
    return;
  }
  useEffect(() => {
    console.log("current", currentCustomer);
    if (customerLineup.length !== 0 && currentCustomer >= customerLineup.length)
      setWin(true);
  }, [currentCustomer]);

  return (
    <div className="food-customer-lineup">
      <div className="food-customer">
        <img
          src={getAvatarState(
            customers[customerLineup[currentCustomer]],
            customerStates[customerLineup[currentCustomer]]
          )}
          alt="Customer being served"
        ></img>
        {showOrder && (
          <div className="food-order">
            {orders[customerLineup[currentCustomer]].map((o, i) => (
              <img key={i} src={o.imagePath} alt={o.name}></img>
            ))}
          </div>
        )}
      </div>
      <div className="food-submit-row">
        <div className="food-selected-items">
          {selectedItems.map((f, i) => (
            <div
              className="food-selected-food"
              key={i}
              name={f.name}
              path={f.imagePath}
              onClick={(e) => {
                handleRemoveItem(i);
              }}
            >
              <img src={f.imagePath} alt={f.name}></img>
            </div>
          ))}
        </div>
        <div className="food-submit-button" onClick={handleSubmit}>
          ✓
        </div>
      </div>
      <div className="food-food-buttons">
        {foods.map((f, i) => (
          <div
            key={f.name}
            className="food-food-button"
            onClick={(e) => {
              handleAddItem(f);
            }}
          >
            <img src={f.imagePath} alt={f.name}></img>
          </div>
        ))}
      </div>
    </div>
  );
}
