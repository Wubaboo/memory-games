import { shuffleArray } from "../../utils/gridUtils";
import { useState } from "react";
import { foods } from "../../data/foods";
import "../../styles/food.css";
export default function FoodGuess({
  customers,
  orders,
  setCustomerStates,
  setMistakes,
  getAvatarState,
  maxFood,
}) {
  const [customerLineup, setCustomerLineup] = useState(
    shuffleArray([...Array(customers.length).keys()])
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(0);

  function check(customerIndex, input) {}

  function handleAddItem(item) {
    if (selectedItems.length < maxFood)
      setSelectedItems((prev) => [...prev, item]);
  }
  function handleRemoveItem(i) {
    let newItems = [...selectedItems];
    newItems.splice(i, 1);
    setSelectedItems(newItems);
  }
  return (
    <div className="food-customer-lineup">
      <img
        className="food-customer"
        src={getAvatarState(
          customers[customerLineup[currentCustomer]],
          "neutral"
        )}
        alt="Customer being served"
      ></img>
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
        <div className="food-submit-button">✓</div>
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
